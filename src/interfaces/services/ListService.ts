/// <reference path="WithLimits.ts" />
/// <reference path="Conditional.ts" />
namespace Interfaces.Services {
    /**
     * Generic interface for list services
     */
    export interface ListService<T> extends WithLimits, Conditional {
        /**
         * Get items
         */
        get(): Promise<Array<T>>

        /**
         * Get model by id
         * 
         * @param id 
         */
        find(id: any): Promise<T>;

        /**
         * Create model
         * 
         * @param attributes 
         */
        create(attributes: object): T;
    }
}