/**
 * Interface for services have conditions
 */
export interface Conditional {
    /**
     * Add condition
     * 
     * @param key 
     * @param value 
     */
    where(key: string, value: any): Conditional;
}