import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function verifyUserAuthorization(role: string[]){
    return (request: Request, response: Response, next: NextFunction) => {
        if(!request.user) {
            throw new AppError("Unauthorized!", 401)
        }
        
        if(!role.includes(request.user.role)) {
            throw new AppError("Unauthorized!", 401)
        }

        return next()
    }
}