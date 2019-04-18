/// <reference path="../Model.ts" />
namespace Interfaces.Models.Users {
    /**
     * Interface for user omdel
     */
    export interface User extends Model {
        /**
         * User's first name
         */
        firstName: string;

        /**
         * User's middle name
         */
        middleName: string;

        /**
         * User's last name
         */
        lastName: string;

        /**
         * Avatar
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
         * OAuth token
         */
        readonly token: string;
    }
}