import type { Request, Response, NextFunction } from "express"
export class HandlerError extends Error{
    status: number
    constructor(status: number, message: string){
        super(message)
        this.status = status
    }
}

export function errorMiddleware(error: HandlerError, req : Request, res: Response, next: NextFunction){
    console.error(error.message, error.status)
    res.status(error.status || 400).json({messageError: error.message})
}