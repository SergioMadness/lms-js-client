/** pending | opened | success | failed | delayed */
export type OrderStatus = string;

/** An order as the B2C API lists it */
export interface OrderSummary {
    id: string;
    amount: number;
    currency: string;
    /** full | subscription | installment */
    payType: string | null;
    status: OrderStatus;
    createdAt: string | null;
}

/**
 * Interface for service to work with the orders of the student
 */
export interface Orders {
    list(page?: number, limit?: number): Promise<OrderSummary[]>;

    find(id: string): Promise<OrderSummary>;

    cancel(id: string): Promise<OrderSummary>;
}
