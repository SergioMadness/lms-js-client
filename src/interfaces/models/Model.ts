/**
 * Interface for models
 */
export interface Model<T> {
    /**
     * Id
     */
    readonly id: number;

    /**
     * Fill model with data
     * 
     * @param attributes 
     */
    fill(attributes: object): T;
}