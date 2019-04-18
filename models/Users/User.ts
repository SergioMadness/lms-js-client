/// <reference path="../../interfaces/models/Users/User.ts" />
namespace Models.Users {
    /**
     * User model
     */
    export class User implements Interfaces.Models.Users.User {
        /**
         * user id
         */
        id: number;
        /**
         * First name
         */
        firstName: string;
        /**
         * Middle name
         */
        middleName: string;
        /**
         * Laset name
         */
        lastName: string;
        /**
         * Avatart
         */
        avatar: string;
        /**
         * E-mail
         */
        email: string;
        /**
         * Phone
         */
        phone: string;
        /**
         * Auth token
         */
        readonly token: string;
    }
}