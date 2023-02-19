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

    /**
     * Send request, get response
     * 
     * @param apiMethod 
     * @param httpMethod 
     * @param data 
     */
    async send(apiMethod: string, httpMethod: string, data: Map<string, any>): Promise<IResponse> {
        let response = null;
        const preparedData = this.prepareData(data);
        const preparedUrl = this.prepareUrl(apiMethod, data);

        let headers = {
            'X-Client-ID': this.getClientId(),
            'Authorization': ''
        };

        if (this.authCredentials && this.authCredentials.isAuthorized()) {
            headers.Authorization = this.authCredentials.getTokenType() + ' ' + this.authCredentials.getAccessToken();
        };

        console.log('preparedUrl', preparedUrl);
        console.log('preparedData', preparedData);
        console.log('headers', headers);
        switch (httpMethod) {
            case constants.HTTP_METHOD_GET:
                response = await axios.get(preparedUrl, {
                    params: preparedData,
                    headers: headers
                });
                break;
            case constants.HTTP_METHOD_POST:
                response = await axios.post(preparedUrl, preparedData, {
                    headers: headers
                });
                break;
            case constants.HTTP_METHOD_PATCH:
                response = await axios.patch(preparedUrl, preparedData, {
                    headers: headers
                });
                break;
            case constants.HTTP_METHOD_PUT:
                response = await axios.put(preparedUrl, preparedData, {
                    headers: headers
                });
                break;
            case constants.HTTP_METHOD_DELETE:
                response = await axios.delete(preparedUrl, {
                    params: preparedData,
                    headers: headers
                });
                break;
        }
        console.log('response', response);

        return new Response(Array.isArray(response.data.data) ? response.data.data.map(function (value: any) {
            return objectToMap(value);
        }) : objectToMap(response.data.data ?? response.data), objectToMap(response.data.metadata ?? {}));
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
    prepareData(data: Map<string, any>): any {
        if (!data.has('client_id')) {
            data.set('client_id', this.getClientId());
        }

        return Object.fromEntries(data);
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