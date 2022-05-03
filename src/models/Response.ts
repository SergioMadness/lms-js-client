import { Response as IResponse } from "../interfaces/models/Response";

export class Response implements IResponse {
    readonly data: any;
    readonly meta: Map<string, any>;

    constructor(data: any, meta: Map<string, any>) {
        this.data = data;
        this.meta = meta;
    }
}