import { Model } from "../Model";
import { Order as IOrder } from '../../interfaces/models/Payment/Order';
import { Payment } from "src/interfaces/models/Payment/Payment";

export class Order extends Model implements IOrder {
    private amount: number;

    private email: string;

    private phone: string;

    private currency: string;

    private payType: string;

    private status: string;

    private payments: Array<Payment>;

    setId(id: string): Order {
        this.id = id;

        return this;
    }

    getId(): string {
        return this.id;
    }

    setAmount(amount: number): Order {
        this.amount = amount;

        return this;
    }

    getAmount(): number {
        return this.amount;
    }

    setEmail(email: string): Order {
        this.email = email;

        return this;
    }

    getEmail(): string {
        return this.email;
    }

    setPhone(phone: string): Order {
        this.phone = phone;

        return this;
    }

    getPhone(): string {
        return this.phone;
    }

    setCurrency(currency: string): Order {
        this.currency = currency;

        return this;
    }

    getCurrency(): string {
        return this.currency;
    }

    setPayType(type: string): Order {
        this.payType = type;

        return this;
    }

    getPayType(): string {
        return this.payType;
    }

    setStatus(status: string): Order {
        this.status = status;

        return this;
    }

    getStatus(): string {
        return this.status;
    }

    setPayments(payments: Array<Payment>): Order {
        this.payments = payments;

        return this;
    }

    getPayments(): Payment[] {
        return this.payments;
    }

    fill(attributes: Map<string, any>): IOrder {
        this
            .setId(attributes.get('id'))
            .setAmount(attributes.get('amount'))
            .setCurrency(attributes.get('currency'))
            .setEmail(attributes.get('email'))
            .setPhone(attributes.get('phone'))
            .setStatus(attributes.get('status'))
            .setPayType(attributes.get('pay_type'));
        const payments = attributes.get('payments');
        if (payments) {
            this.setPayments(payments);
        }
        return this;
    }
}