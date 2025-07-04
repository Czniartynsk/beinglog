import { Request, Response, NextFunction } from "express";
import z from "zod";
import { hash } from "bcrypt"
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class UsersController {
    async create(request: Request, response: Response, next: NextFunction){
        const bodySchema = z.object({
            name: z.string().trim().min(2),
            email: z.string().email(),
            password: z.string().min(8),
            role: z.enum(["customer", "sale"]).optional()
        })

        const { name, email, password, role } = bodySchema.parse(request.body)

        const userWithSameEmail = await prisma.user.findFirst({ where: { email }})

        if (userWithSameEmail){
            throw new AppError("User with same email already exists")
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role ?? "customer"
            },
        })

        /* Desestrutura separado o password e utiliza o spread 
        * para desestuturar o restante, assim, passando a variável 
        * que utilizou o spread operator, passa o usuário sem a senha
        
        * Poderia passar assim:
        * const { password, ...userWithoutPassword }
        * Mas daria conflito com o password declarado 
        * anteriormente, pra não acontecer, passa dessa forma: 
        * Renomeando para um underline*/
        const { password: _, ...userWithoutPassword } = user
        
        return response.status(201).json(userWithoutPassword)
    }
}

export { UsersController }