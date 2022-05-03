import { Paginator as IPaginator } from "../interfaces/models/Paginator";

export class Paginator<T> implements IPaginator<T> {
    _total: number;

    _items: Array<T>;

    _totalPages: number;

    _itemsPerPage: number;

    constructor(items: Array<T>, total: number = null, totalPages: number = null, ipp: number = null) {
        this.setItems(items).setTotal(total).setTotalPages(totalPages).setItemsPerPage(ipp);
    }

    setTotal(total: number): Paginator<T> {
        this._total = total;

        return this;
    }

    /**
     * Get total items number
     */
    getTotal(): number {
        return this._total;
    }

    setItems(items: Array<T>): Paginator<T> {
        this._items = items;

        return this;
    }

    /**
     * Get current items
     */
    getItems(): Array<T> {
        return this._items;
    }

    setTotalPages(total: number): Paginator<T> {
        this._totalPages = total;

        return this;
    }

    /**
     * Get total pages
     */
    getTotalPages(): number {
        return this._totalPages;
    }

    setItemsPerPage(ipp: number): Paginator<T> {
        this._itemsPerPage = ipp;

        return this;
    }

    /**
     * Get items per page
     */
    getItemsPerPage(): number {
        return this._itemsPerPage;
    }
}