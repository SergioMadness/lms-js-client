import { Model } from "../Model";
import { Price as IPrice } from '../../interfaces/models/Payment/Price';

export class Price extends Model implements IPrice {

    public id: string;

    private amount: number;

    private currency: string;

    private orderType: string;

    private payType: string;

    private period: number;

    private unlimited: boolean = false;

    constructor(data: Map<string, any>) {
        super();

        this.fill(data);
    }

    setId(id: string): Price {
        this.id = id;

        return this;
    }

    getId(): string {
        return this.id;
    }

    setAmount(amount: number): Price {
        this.amount = amount;

        return this;
    }

    getAmount(): number {
        return this.amount;
    }

    setCurrency(currency: string): Price {
        this.currency = currency;

        return this;
    }

    getCurrency(): string {
        return this.currency;
    }

    setOrderType(type: string): Price {
        this.orderType = type;

        return this;
    }

    getOrderType(): string {
        return this.orderType;
    }

    setPayType(type: string): Price {
        this.payType = type;

        return this;
    }

    getPayType(): string {
        return this.payType;
    }

    setPeriod(period: number): Price {
        this.period = period;

        return this;
    }

    getPeriod(): number {
        return this.period;
    }

    setIsUnlimited(flag: boolean = true): Price {
        this.unlimited = flag;

        return this;
    }

    isUnlimited(): boolean {
        return this.unlimited;
    }

    fill(attributes: Map<string, any>): IPrice {
        return this
            .setId(attributes.get('id'))
            .setAmount(attributes.get('amount'))
            .setCurrency(attributes.get('currency'))
            .setIsUnlimited(attributes.get('is_unlimited'))
            .setOrderType(attributes.get('order_type'))
            .setPayType(attributes.get('pay_type'))
            .setPeriod(attributes.get('period'));
    }

}