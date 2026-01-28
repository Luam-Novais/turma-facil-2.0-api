import type { Request, Response, NextFunction } from "express"
export class HandlerError extends Error{
    status: number
    constructor(status: number, message: string){
        super(message)
        this.status = status
    }
}

export function errorMiddleware(error: HandlerError, req : Request, res: Response, next: NextFunction){
    console.error(error.message)
    res.status(error.status).json({messageError: error.message})
}