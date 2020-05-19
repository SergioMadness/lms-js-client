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

/**
 * Class to work with user services
 */
export class Users extends WebService implements IUserService {
    async register(user: IUserModel): Promise<IUserModel> {
        const response = await this.getTransport().send(METHOD_REGISTRATION, constants.HTTP_METHOD_POST, user.toArray());
        return this.create(response.shift());
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

        const credentials = response.shift();

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
}