declare namespace Express {
    export interface Request {
        user?: {
            id: string,
            role: string
        }
    }
}

// Exportando uma interface com o mesmo nome de uma que já existe, ele mescla as duas