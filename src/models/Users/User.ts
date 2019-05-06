/// <reference path="../../interfaces/models/Users/User.ts" />
/// <reference path="../../models/Model.ts" />
namespace Models.Users {
    /**
     * User model
     */
    export class User extends Models.Model implements Interfaces.Models.Users.User {
        toArray(): Map<string, any> {
            return new Map<string, any>([
                
            ]);
        }

        constructor(attributes: Map<string, any>) {
            super();
            this.fill(attributes);
        }

        fill(attributes: Map<string, any>): Interfaces.Models.Users.User {
            this.id = attributes.get('id');
            this.firstName = attributes.get('first_name');
            this.middleName = attributes.get('middle_name');
            this.lastName = attributes.get('last_name');
            this.email = attributes.get('email');
            this.phone = attributes.get('phone');
            this.avatar = attributes.get('avatar');

            return this;
        }
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