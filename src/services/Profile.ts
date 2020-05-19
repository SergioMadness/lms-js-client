import { Profile as IProfile } from '../interfaces/services/Profile';
import { User } from '../interfaces/models/Users/User';
import { WebService } from './WebService';
import * as constants from './HttpMethods';
import { User as UserModel } from '../models/Users/User';

const METHOD_GET_PROFILE = '/api/v2/profile';

export class Profile extends WebService implements IProfile {
    async get(): Promise<User> {
        const response = await this.getTransport().send(METHOD_GET_PROFILE, constants.HTTP_METHOD_GET, new Map());
        return new UserModel(response.shift());
    }
}