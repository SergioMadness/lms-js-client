import { User as UserModel } from '../models/Users/User';
import { AuthCredentials } from '../../interfaces/models/Users/AuthCredentials';

/**
 * Interface for service to work with users
 */
export interface Users {
    /**
     * Register user
     * 
     * @param user 
     */
    register(user: UserModel): Promise<UserModel>;

    /**
     * Log in user by login and password
     * 
     * @param login 
     * @param password 
     */
    login(login: string, password: string, clientId: string, clientSecret: string): Promise<AuthCredentials>;

    /**
     * Get user by id
     * 
     * @param id 
     */
    get(id: number): Promise<UserModel>;
}