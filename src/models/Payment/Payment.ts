import { Model } from "../Model";
import { Payment as IPayment } from '../../interfaces/models/Payment/Payment';
import { Price } from "./Price";

export class Payment extends Model implements IPayment {
    public id: string;

    private orderId: string;

    private amount: number;

    private status: string;

    private payedAt: Date;

    setId(id: string): Payment {
        this.id = id;

        return this;
    }

    getId(): string {
        return this.id;
    }

    setOrderId(orderId: string): Payment {
        this.orderId = orderId;

        return this;
    }

    getOrderId(): string {
        return this.orderId;
    }

    setAmount(amount: number): Payment {
        this.amount = amount;

        return this;
    }

    getAmount(): number {
        return this.amount;
    }

    setStatus(status: string): Payment {
        this.status = status;

        return this;
    }

    getStatus(): string {
        return this.status;
    }

    setPayedAt(date: Date): Payment {
        this.payedAt = date;

        return this;
    }

    getPayedAt(): Date {
        return this.payedAt;
    }

    fill(attributes: Map<string, any>): IPayment {
        this
            .setId(attributes.get('id'))
            .setOrderId(attributes.get('order_id'))
            .setAmount(attributes.get('amount'))
            .setStatus(attributes.get('status'));
        if (attributes.get('payed_at')) {
            this.setPayedAt(new Date(attributes.get('payed_at')));
        }
        return this;
    }

}