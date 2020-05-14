import { User as IUserModel } from '../interfaces/models/Users/User';
import { Users as IUserService } from '../interfaces/services/Users';
import * as constants from './HttpMethods';
import { User } from '../models/Users/User';
import { WebService } from './WebService';

export const METHOD_REGISTRATION = '/api/v2/registration';

export const METHOD_GET_USER = '/api/v2/users/{id}';

/**
 * Class to work with user services
 */
export class Users extends WebService implements IUserService {
    async register(user: IUserModel): Promise<IUserModel> {
        const response = await this.getTransport().send(METHOD_REGISTRATION, constants.HTTP_METHOD_POST, user.toArray());
        return this.create(response.shift());
    }

    login(login: string, password: string): Promise<IUserModel> {
        throw new Error("Method not implemented.");
    }

    get(id: number): Promise<IUserModel> {
        throw new Error("Method not implemented.");
    }

    create(attributes?: Map<string, any>): IUserModel {
        return new User(attributes);
    }
}