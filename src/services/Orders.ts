import * as constants from './HttpMethods';
import { WebService } from './WebService';
import { Orders as IOrders, OrderSummary } from '../interfaces/services/Orders';

export const METHOD_GET_ORDERS = '/api/v2/orders';

export const METHOD_ORDER = '/api/v2/order/{id}';

/**
 * Service to work with the orders of the student (lms-payment B2C)
 *
 * An order is made and paid on the page of the school (`/mobile/order`):
 * the API builds an order only from the basket of the website, so there is
 * no `create` here.
 */
export class Orders extends WebService implements IOrders {

    async list(page: number = 1, limit: number = 20): Promise<OrderSummary[]> {
        const response = await this.getTransport().send(METHOD_GET_ORDERS, constants.HTTP_METHOD_GET, new Map<string, any>([
            ['page', page],
            ['limit', limit]
        ]));

        return (Array.isArray(response.data) ? response.data : []).map(Orders.orderOf);
    }

    async find(id: string): Promise<OrderSummary> {
        const response = await this.getTransport().send(METHOD_ORDER, constants.HTTP_METHOD_GET, new Map<string, any>([
            ['id', id]
        ]));

        return Orders.orderOf(response.data);
    }

    /** A paid order is refused with 409 */
    async cancel(id: string): Promise<OrderSummary> {
        const response = await this.getTransport().send(METHOD_ORDER, constants.HTTP_METHOD_DELETE, new Map<string, any>([
            ['id', id]
        ]));

        return Orders.orderOf(response.data);
    }

    private static orderOf(data: any): OrderSummary {
        const get = (key: string) => data instanceof Map ? data.get(key) : data[key];

        return {
            id: String(get('id') ?? ''),
            amount: Number(get('amount') ?? 0),
            currency: get('currency') ?? '',
            payType: get('pay_type') ?? null,
            status: get('status') ?? '',
            createdAt: get('created_at') ?? null
        };
    }
}
