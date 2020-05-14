import { IndexItem } from "./IndexItem";

/**
 * Interface for index
 */
export interface Index {
    /**
     * Add index item
     * 
     * @param item 
     */
    add(item: IndexItem): Index;

    /**
     * Move to next item
     */
    next(): Index;

    /**
     * Move to previous item
     */
    prev(): Index;

    /**
     * Get current item
     */
    current(): IndexItem;

    /**
     * Set current item
     * 
     * @param item 
     */
    setCurrent(item: IndexItem): Index;
}