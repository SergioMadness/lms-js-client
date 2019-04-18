/// <reference path="../Model.ts" />
namespace Interfaces.Models.SAAS {
    /**
     * Interface for Package model
     */
    export interface Package extends Model {
        /**
         * Package name
         */
        readonly name: string;

        /**
         * Package alias
         */
        readonly alias: string;
    }
}