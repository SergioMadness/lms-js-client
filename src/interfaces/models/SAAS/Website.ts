import { Model } from '../Model';

/**
 * Interface for website model
 */
export interface Website extends Model<Website> {
    /**
     * Website name
     */
    readonly name: string;

    /**
     * Website domain
     */
    readonly domain: string;

    /**
     * Logo url
     */
    readonly logo: string;

    /**
     * Meta tags
     */
    readonly meta: object;

    /**
     * Phone
     */
    readonly phone: string;

    /**
     * Email
     */
    readonly email: string;

    /**
     * Address
     */
    readonly address: string;
}