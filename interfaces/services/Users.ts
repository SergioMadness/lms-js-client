/// <reference path="../models/Users/User.ts" />
namespace Services {
    /**
     * Interface for service to work with users
     */
    export interface Users {
        /**
         * Register user
         * 
         * @param user 
         */
        register(user: Models.Users.User): Models.Users.User;

        /**
         * Log in user by login and password
         * 
         * @param login 
         * @param password 
         */
        login(login: string, password: string): Models.Users.User;

        /**
         * Get user by id
         * 
         * @param id 
         */
        get(id: number): Models.Users.User;
    }
}