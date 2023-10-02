//@flow
import { User as IUserModel } from '../interfaces/models/Users/User';
import { Users as IUserService } from '../interfaces/services/Users';
import * as constants from './HttpMethods';
import { User } from '../models/Users/User';
import { WebService } from './WebService';
import { AuthCredentials as IAuthCredentials } from '../interfaces/models/Users/AuthCredentials';
import { AuthCredentials } from '../models/Users/AuthCredentials';

export const METHOD_REGISTRATION = '/api/v2/registration';

export const METHOD_GET_USER = '/api/v2/users/{id}';

export const METHOD_LOGIN = '/oauth/token';

export const METHOD_REFRESH_TOKEN = '/oauth/token/refresh';

/**
 * Class to work with user services
 */
export class Users extends WebService implements IUserService {

    private credentials: IAuthCredentials;

    constructor(credentials: IAuthCredentials) {
        super();

        this.setCredentials(credentials);
    }

    async register(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        dateOfBirth = '',
        middleName: string = '',
        phone: string = '',
    ): Promise<IUserModel> {
        const response = await this.getTransport().send(METHOD_REGISTRATION, constants.HTTP_METHOD_POST, new Map<string, any>([
            ['first_name', firstName],
            ['middle_name', middleName],
            ['last_name', lastName],
            ['email', email],
            ['phone', phone],
            ['password', password],
            ['politics', true],
            ['date_of_birth', dateOfBirth],
        ]));

        return this.create(response.data);
    }

    async login(login: string, password: string, clientId: string, clientSecret: string): Promise<IAuthCredentials> {
        const response = await this.getTransport().send(METHOD_LOGIN, constants.HTTP_METHOD_POST, new Map<string, string>([
            ['grant_type', 'password'],
            ['client_id', clientId],
            ['client_secret', clientSecret],
            ['username', login],
            ['password', password],
            ['scope', '*']
        ]));

        const credentials = response.data;

        let result = new AuthCredentials();
        result.setAccessToken(credentials.get('access_token'));
        result.setRefreshToken(credentials.get('refresh_token'));
        result.setTokenType(credentials.get('token_type'));
        let expiresDate = new Date();
        expiresDate.setSeconds(expiresDate.getSeconds() + credentials.get('expires_in'));
        result.setExpiresDate(expiresDate);

        return result;
    }

    /**
     * Refresh access token
     * 
     * @param clientId 
     * @param clientSecret 
     */
    async refresh(clientId: string, clientSecret: string): Promise<AuthCredentials> {
        const currentCredentials = this.getCredentials();
        const refreshToken = currentCredentials.getRefreshToken();
        if (!refreshToken) {
            throw new Error('Need refresh token');
        }

        const response = await this.getTransport().send(METHOD_REFRESH_TOKEN, constants.HTTP_METHOD_POST, new Map<string, string>([
            ['grant_type', 'refresh_token'],
            ['client_id', clientId],
            ['client_secret', clientSecret],
            ['refresh_token', refreshToken],
            ['scope', '']
        ]));

        const credentials = response.data;

        let result = new AuthCredentials();
        result.setAccessToken(credentials.get('access_token'));
        result.setRefreshToken(credentials.get('refresh_token'));
        result.setTokenType(credentials.get('token_type'));
        let expiresDate = new Date();
        expiresDate.setSeconds(expiresDate.getSeconds() + credentials.get('expires_in'));
        result.setExpiresDate(expiresDate);

        return result;
    }

    get(id: number): Promise<IUserModel> {
        throw new Error("Method not implemented.");
    }

    create(attributes?: Map<string, any>): IUserModel {
        return new User(attributes);
    }

    setCredentials(credentials: IAuthCredentials): Users {
        this.credentials = credentials;

        return this;
    }

    getCredentials(): IAuthCredentials {
        return this.credentials;
    }
}