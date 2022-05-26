import { User as UserModel } from '../../interfaces/models/Users/User';
import { Model } from '../Model';

/**
 * User model
 */
export class User extends Model implements UserModel {
    toArray(): Map<string, any> {
        return new Map<string, any>([
            ['first_name', this.firstName],
            ['middle_name', this.middleName],
            ['last_name', this.lastName],
            ['email', this.email],
            ['phone', this.phone],
            ['date_of_birth', this.dateOfBirth ? (this.dateOfBirth.toString()) : null],
        ]);
    }

    constructor(attributes: Map<string, any>) {
        super();
        if (attributes) {
            this.fill(attributes);
        }
    }

    fill(attributes: Map<string, any>): UserModel {
        this.id = attributes.get('id');
        this.firstName = attributes.get('first_name');
        this.middleName = attributes.get('middle_name');
        this.lastName = attributes.get('last_name');
        this.email = attributes.get('email');
        this.phone = attributes.get('phone');
        this.avatar = attributes.get('avatar');
        this.dateOfBirth = attributes.get('date_of_birth');

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

    public dateOfBirth: Date;
}