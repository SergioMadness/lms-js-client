
import { Transport as ITransport } from '../interfaces/services/Transport';
import * as constants from './HttpMethods';
import axios from 'axios';
import { rtrim, ltrim } from './Strings';
import { AuthCredentials } from '../interfaces/models/Users/AuthCredentials';

/**
 * Class to process requests
 */
export class Transport implements ITransport {

    baseUrl: string;

    private authCredentials: AuthCredentials;

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
    async send(apiMethod: string, httpMethod: string, data: Map<string, any>): Promise<Array<Map<string, any>>> {
        let response = null;
        const preparedData = this.prepareData(data);
        const preparedUrl = this.prepareUrl(apiMethod, data);

        let headers = this.authCredentials.isAuthorized() ? {
            'Authorization': this.authCredentials.getTokenType() + ' ' + this.authCredentials.getAccessToken();
        } : {};
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

        let result = response.data;
        if (!Array.isArray(result)) {
            result = [result];
        }

        return result;
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
}