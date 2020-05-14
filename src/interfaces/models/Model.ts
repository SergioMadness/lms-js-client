/**
 * Interface for models
 */
export interface Model<T> {
    /**
     * Id
     */
    readonly id: string;

    /**
     * Fill model with data
     * 
     * @param attributes 
     */
    fill(attributes: object): T;
}