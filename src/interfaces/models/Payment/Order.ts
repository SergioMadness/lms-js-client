import { Model } from "../Model";
import { Payment } from './Payment';

/** Pending status */
export const ORDER_STATUS_PENDING = 'pending';

/** Opened/In progress */
export const ORDER_STATUS_OPENED = 'opened';

/** Success status */
export const ORDER_STATUS_SUCCESS = 'success';

/**  Filed status */
export const ORDER_STATUS_FAILED = 'failed';

/**
 * Interface for order model
 */
export interface Order extends Model<Order> {
    /** Order id */
    getId(): string;

    /** Order amount */
    getAmount(): number;

    /** User's email */
    getEmail(): string;

    /** User's phone */
    getPhone(): string;

    /** Currency */
    getCurrency(): string;

    /** Pay type */
    getPayType(): string;

    /** Order status */
    getStatus(): string;

    /** Payment in order */
    getPayments(): Array<Payment>;
}