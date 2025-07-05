import { PrismaClient } from "@prisma/client";
import { env } from "../env";

export const prisma = new PrismaClient({
    // A variavel define se o projeto está executando 
    // em desenvolvimento ou produção. Se for produção, 
    // não apresenta nada. Se não, mostra as querys realizadas.
    log: env.NODE_ENV === "production" ? [] : ["query"],
})