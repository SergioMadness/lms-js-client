import { Transport as ITransport } from '../interfaces/services/Transport';
import * as constants from './HttpMethods';
import axios from 'axios';
import { rtrim, ltrim } from './Strings';
import { AuthCredentials } from '../interfaces/models/Users/AuthCredentials';
import { objectToMap } from './Helpers';
import { Response as IResponse } from '../interfaces/models/Response';
import { Response } from '../models/Response';

/**
 * Class to process requests
 */
export class Transport implements ITransport {

    baseUrl: string;

    private authCredentials: AuthCredentials;

    private clientId: string;

    setAuthCredentials(credentials: AuthCredentials): ITransport {
        this.authCredentials = credentials;

        return this;
    }

    getAuthCredentials(): AuthCredentials {
        return this.authCredentials;
    }

    _mapToFormData(data: Map<string, any>): FormData {
        const result = new FormData();

        data.forEach(function (value, key) {
            result.append(key, value);
        });

        return result;
    }

    /**
     * Send request, get response
     * 
     * @param apiMethod 
     * @param httpMethod 
     * @param data 
     */
    async send(apiMethod: string, httpMethod: string, data: Map<string, any>, headers: Map<string, string> = null): Promise<IResponse> {
        let response = null;
        const preparedData = this.prepareData(data);
        const preparedUrl = this.prepareUrl(apiMethod, data);

        headers = headers || new Map<string, string>();
        headers.set('X-Client-ID', this.getClientId());

        if (this.authCredentials && this.authCredentials.isAuthorized()) {
            headers.set('Authorization', this.authCredentials.getTokenType() + ' ' + this.authCredentials.getAccessToken());
        };

        if (!headers.has('Content-Type') && preparedData.has('raw-content')) {
            if (typeof preparedData.get('raw-content') === 'string') {
                headers.set('Content-Type', 'text/html');
            } else {
                headers.set('Content-Type', 'application/json');
            }
        }

        const needFormData = headers.has('Content-Type') && headers.get('Content-Type') === 'multipart/form-data';

        const headersO = Object.fromEntries(headers);

        console.log('preparedUrl', preparedUrl);
        console.log('preparedData', preparedData);
        console.log('headers', headersO);

        switch (httpMethod) {
            case constants.HTTP_METHOD_GET:
                response = await axios.get(preparedUrl, {
                    params: Object.fromEntries(preparedData),
                    headers: headersO
                });
                break;
            case constants.HTTP_METHOD_POST:
                response = await axios.post(preparedUrl, needFormData ? this._mapToFormData(preparedData) : Object.fromEntries(preparedData), {
                    headers: headersO
                });
                break;
            case constants.HTTP_METHOD_PATCH:
                response = await axios.patch(preparedUrl, preparedData.has('raw-content') ? preparedData.get('raw-content') : this._mapToFormData(preparedData), {
                    headers: headersO
                });
                break;
            case constants.HTTP_METHOD_PUT:
                response = await axios.put(preparedUrl, preparedData.has('raw-content') ? preparedData.get('raw-content') : this._mapToFormData(preparedData), {
                    headers: headersO
                });
                break;
            case constants.HTTP_METHOD_DELETE:
                response = await axios.delete(preparedUrl, {
                    data: preparedData.has('raw-content') ? preparedData.get('raw-content') : JSON.stringify(Object.fromEntries(preparedData)),
                    headers: headersO
                });
                break;
        }
        console.log('response', response);

        const responseData = response.data.data ?? response.data;
        const metaData = objectToMap(response.data.metadata ?? {});
        if (Array.isArray(responseData)) {
            return new Response(responseData.map(function (value: any) {
                return objectToMap(value);
            }), metaData);
        }
        if (typeof responseData === 'string') {
            return new Response(responseData, metaData);
        }

        return new Response(objectToMap(responseData), metaData);
    }

    /**
     * Send data to api method with multipart type
     * 
     * @param apiMethod 
     * @param data 
     */
    sendMultipart(apiMethod: string, data: Map<string, any>): Promise<IResponse> {
        return this.send(apiMethod, constants.HTTP_METHOD_POST, data, new Map<string, string>([
            ['Content-Type', 'multipart/form-data']
        ]));
    }

    /**
     * Prepare URL
     * 
     * @param apiMethod 
     */
    prepareUrl(apiMethod: string, data: Map<string, string>): string {
        let result = rtrim(this.getBaseUrl(), '/') + '/' + ltrim(apiMethod, '/');
        data.forEach(function (value, index) {
            result = result.replace('{' + index + '}', value);
        });

        return result;
    }

    /**
     * Prepare data
     * 
     * @param data 
     */
    prepareData(data: Map<string, any>): Map<string, any> {
        if (!data.has('client_id')) {
            data.set('client_id', this.getClientId());
        }

        return data;
    }

    /**
     * Set base url
     * 
     * @param url 
     */
    setBaseUrl(url: string): Transport {
        this.baseUrl = url;
        return this;
    }

    /**
     * Get base url
     */
    getBaseUrl(): string {
        return this.baseUrl;
    }

    /**
     * Set clientId
     * 
     * @param id 
     */
    setClientId(id: string): Transport {
        this.clientId = id;
        return this;
    }

    /**
     * Get client id
     */
    getClientId(): string {
        return this.clientId;
    }
}