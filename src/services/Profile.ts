import { Profile as IProfile } from '../interfaces/services/Profile';
import { User } from '../interfaces/models/Users/User';
import { WebService } from './WebService';
import * as constants from './HttpMethods';
import { UserProcesses } from './Courses/UserProcesses';
import { User as UserModel } from '../models/Users/User';
import { UserProcesses as IUserProcesses } from '../interfaces/services/Courses/UserProcesses';

const METHOD_GET_PROFILE = '/api/v2/profile';

const METHOD_UPDATE_PROFILE = '/api/v2/profile';

/**
 * Service to work with current user profile
 */
export class Profile extends WebService implements IProfile {
    async get(): Promise<User> {
        const response = await this.getTransport().send(METHOD_GET_PROFILE, constants.HTTP_METHOD_GET, new Map());
        
        return new UserModel(response.data);
    }

    processes(): IUserProcesses {
        const result = new UserProcesses();

        result.setTransport(this.getTransport());

        return result;
    }

    /**
     * Update user
     * 
     * @param user 
     */
    async update(user: User): Promise<User> {
        const response = await this.getTransport().send(METHOD_UPDATE_PROFILE, constants.HTTP_METHOD_POST, user.toArray());

        return new UserModel(response.data);
    }
}