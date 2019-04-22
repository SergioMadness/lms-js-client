namespace Interfaces.Services {
    export interface RequestOptions {
        ignoreCache?: boolean;
        headers?: { [key: string]: string };
        // 0 (or negative) to wait forever
        timeout?: number;
    }

    export const DEFAULT_REQUEST_OPTIONS = {
        ignoreCache: false,
        headers: {
            Accept: 'application/json, text/javascript, text/plain',
        },
        // default max duration for a request
        timeout: 5000,
    };

    export interface RequestResult {
        ok: boolean;
        status: number;
        statusText: string;
        data: string;
        json: <T>() => T;
        headers: string;
    }
}