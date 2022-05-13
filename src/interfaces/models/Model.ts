/**
 * Interface for models
 */
export interface Model<T> {
    /**
     * Fill model with data
     * 
     * @param attributes 
     */
    fill(attributes: object): T;
}