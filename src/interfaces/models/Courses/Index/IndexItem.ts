/**
 * Interface for index item
 */
export interface IndexItem {
    /** Get item id */
    getId(): string;

    /** Get lable */
    getLabel(): string;

    /** Get task type */
    getType(): string;

    /** Check item is available */
    isAvailable(): boolean;

    /** Check item was passed */
    isPassed(): boolean;

    /** Check step is successful */
    isSuccessful(): boolean;

    /** Step failed */
    isFailed(): boolean;

    /** Get children */
    children(): Array<IndexItem>;
}