import { Model } from "../Model";

/** Pending status */
export const PAYMENT_STATUS_PENDING = 'pending';

/** Success status */
export const PAYMENT_STATUS_SUCCESS = 'success';

/** Filed status */
export const PAYMENT_STATUS_FAILED = 'failed';

/**
 * Interface for payment model
 */
export interface Payment extends Model<Payment> {
    /** Payment id */
    getId(): string;

    /** Order id */
    getOrderId(): string;

    /** Payment amount */
    getAmount(): number;

    /** Payment status */
    getStatus(): string;

    /** get Payment date */
    getPayedAt(): Date;
}