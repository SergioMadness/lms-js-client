/// <reference path="../models/Users/User.ts" />
namespace Interfaces.Services {
    /**
     * Interface for service to work with users
     */
    export interface Users {
        /**
         * Register user
         * 
         * @param user 
         */
        register(user: Models.Users.User): Promise<Interfaces.Models.Users.User>;

        /**
         * Log in user by login and password
         * 
         * @param login 
         * @param password 
         */
        login(login: string, password: string): Promise<Interfaces.Models.Users.User>;

        /**
         * Get user by id
         * 
         * @param id 
         */
        get(id: number): Promise<Interfaces.Models.Users.User>;
    }
}