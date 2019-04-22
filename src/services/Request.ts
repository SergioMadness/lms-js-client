/// <reference path="HttpMethods.ts" />
/// <reference path="../interfaces/services/Request.ts" />

namespace Services {
    function queryParams(params: any = {}) {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }

    function withQuery(url: string, params: any = {}) {
        const queryString = queryParams(params);
        return queryString ? url + (url.indexOf('?') === -1 ? '?' : '&') + queryString : url;
    }

    function parseXHRResult(xhr: XMLHttpRequest): Interfaces.Services.RequestResult {
        return {
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: xhr.responseText,
            json: <T>() => JSON.parse(xhr.responseText) as T,
        };
    }

    function errorResponse(xhr: XMLHttpRequest, message: string | null = null): Interfaces.Services.RequestResult {
        return {
            ok: false,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: message || xhr.statusText,
            json: <T>() => JSON.parse(message || xhr.statusText) as T,
        };
    }

    export function request(method: string,
        url: string,
        queryParams: any = {},
        body: any = null,
        options: Interfaces.Services.RequestOptions = Interfaces.Services.DEFAULT_REQUEST_OPTIONS): Promise<Interfaces.Services.RequestResult> {

        const ignoreCache = options.ignoreCache || Interfaces.Services.DEFAULT_REQUEST_OPTIONS.ignoreCache;
        const headers = options.headers || Interfaces.Services.DEFAULT_REQUEST_OPTIONS.headers;
        const timeout = options.timeout || Interfaces.Services.DEFAULT_REQUEST_OPTIONS.timeout;

        return new Promise<Interfaces.Services.RequestResult>((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, withQuery(url, queryParams));

            if (headers) {
                Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
            }

            if (ignoreCache) {
                xhr.setRequestHeader('Cache-Control', 'no-cache');
            }

            xhr.timeout = timeout;

            xhr.onload = () => {
                resolve(parseXHRResult(xhr));
            };

            xhr.onerror = () => {
                resolve(errorResponse(xhr, 'Failed to make request.'));
            };

            xhr.ontimeout = () => {
                resolve(errorResponse(xhr, 'Request took longer than expected.'));
            };

            if (method === 'post' && body) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(body));
            } else {
                xhr.send();
            }
        });
    }
}