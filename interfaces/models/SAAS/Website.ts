/// <reference path="../Model.ts" />
namespace Interfaces.Models.SAAS {
    /**
     * Interface for website model
     */
    export interface Website extends Model {
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
        readonly [meta: string]: string;

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
}