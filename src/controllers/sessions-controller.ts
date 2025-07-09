import { authConfig } from "@/configs/auth";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { sign, SignOptions } from "jsonwebtoken";
import z from "zod";

class SessionsController {
    async create(request: Request, response: Response, next: NextFunction){
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(8)
        })

        const { email, password } = bodySchema.parse(request.body)

        const user = await prisma.user.findFirst({ where: { email } })

        if (!user){
            throw new AppError("Invalid email or password", 401)
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched){
            throw new AppError("Invalid email or password", 401)
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({ 
            role: user.role ?? "customer",
            sub: user.id,
            }, 
            secret, 
            { 
                expiresIn: expiresIn as SignOptions["expiresIn"], // aqui ele pega "1d" do authConfig 
            }
        );

        const { password: passwordHashed, ...userWithoutPassword } = user

        return response.json({ token, user: userWithoutPassword })
        // Ou poderia passar também, tudo no mesmo nível: 
        // .json({ token, ...userWithoutPassword })
    }
}

export { SessionsController }