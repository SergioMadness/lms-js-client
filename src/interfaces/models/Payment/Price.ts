import { Model } from "../Model";

export const ORDER_TYPE_SUBSCRIPTION = 'subscription';
export const ORDER_TYPE_FULL = 'full';
export const ORDER_TYPE_INSTALLMENT = 'installment';

/**
 * Interface for price model
 */
export interface Price extends Model<Price> {

    /** Price id */
    getId(): string;

    /** Amount */
    getAmount(): number;

    /** Currency */
    getCurrency(): string;

    /** Order type */
    getOrderType(): string;

    /** Pay type */
    getPayType(): string;

    /** Period */
    getPeriod(): number;

    /** Is unlimited */
    isUnlimited(): boolean;
}