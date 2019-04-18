/// <reference path="../Model.ts" />
namespace Interfaces.Models.SAAS {
    /**
     * Interface for company model
     */
    export interface Company extends Model {
        /**
         * Company name
         */
        readonly name: string;

        /**
         * Packages available to company
         */
        readonly [packages: number]: Package;
    }
}