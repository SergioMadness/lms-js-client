import { Response as IResponse } from "../interfaces/models/Response";

export class Response implements IResponse {
    readonly data: any;
    readonly meta: Map<string, any>;
    private error: string;
    private status: number;

    constructor(data: any, meta: Map<string, any>) {
        this.data = data;
        this.meta = meta;
    }

    setError(error: string): Response {
        this.error = error;

        return this;
    }

    hasError(): boolean {
        return this.error?.length > 0 || this.getStatus() >= 400;
    }

    setStatus(status: number): Response {
        this.status = status;

        return this;
    }

    getStatus(): number {
        return this.status;
    }

    getErrorMessage(): string {
        return this.error;
    }
}