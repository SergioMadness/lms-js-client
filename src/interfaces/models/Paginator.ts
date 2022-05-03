/**
 * Interface for paginator
 */
export interface Paginator<T> {
    /**
     * Get total items number
     */
    getTotal(): number;

    /**
     * Get current items
     */
    getItems(): Array<T>;

    /**
     * Get total pages
     */
    getTotalPages(): number;

    /**
     * Get items per page
     */
    getItemsPerPage(): number;
}