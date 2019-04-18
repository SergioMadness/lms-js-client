/// <reference path="WithLimits.ts" />
/// <reference path="Conditional.ts" />
/**
 * Generic interface for list services
 */
interface ListService<T> extends WithLimits, Conditional {
    /**
     * Get items
     */
    get(): Array<T>

    /**
     * Get model by id
     * 
     * @param id 
     */
    find(id: any): T;
}