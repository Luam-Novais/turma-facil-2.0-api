export class HandlerError extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
export function errorMiddleware(error, req, res, next) {
    console.error(error.message, error.status);
    res.status(error.status || 400).json({ messageError: error.message });
}
