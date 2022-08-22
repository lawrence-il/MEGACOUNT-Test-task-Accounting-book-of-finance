class RequestError extends Error{
    status: number;

    constructor(status: number, message: string) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(message: string) {
        return new RequestError(404, message)
    }

    static internal (message: string) {
        return new RequestError(500, message)
    }

    static forbidden (message: string) {
        return new RequestError(403, message)
    }
}

export default RequestError;