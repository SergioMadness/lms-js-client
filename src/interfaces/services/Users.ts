import { User as UserModel } from '../models/Users/User';
import { AuthCredentials } from '../../interfaces/models/Users/AuthCredentials';

/**
 * Interface for service to work with users
 */
export interface Users {
    /**
     * Register user
     * 
     * @param email 
     * @param password 
     * @param firstName 
     * @param lastName 
     * @param dateOfBirth 
     * @param middleName 
     * @param phone 
     */
    register(email: string,
        password: string,
        firstName: string,
        lastName: string,
        dateOfBirth: string,
        middleName: string,
        phone: string,
    ): Promise<UserModel>;

    /**
     * Log in user by login and password
     * 
     * @param login 
     * @param password 
     */
    login(login: string, password: string, clientId: string, clientSecret: string): Promise<AuthCredentials>;

    /**
     * Refresh access token
     * 
     * @param refreshToken 
     * @param clientId 
     * @param clientSecret 
     */
    refresh(refreshToken: string, clientId: string, clientSecret: string): Promise<AuthCredentials>;

    /**
     * Get user by id
     * 
     * @param id 
     */
    get(id: number): Promise<UserModel>;

    /**
     * Auth by social token
     * 
     * @param driver
     * @param token 
     * @param email 
     */
    loginBySocialToken(driver: string, token: string, email: string): Promise<AuthCredentials>;

    /**
     * Auth by signed data
     * 
     * @param driver 
     * @param data 
     */
    loginBySignedData(driver: string, data: Array<object>): Promise<AuthCredentials>;
}