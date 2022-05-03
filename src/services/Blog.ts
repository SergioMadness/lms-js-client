import { Blog as IBlogService } from '../interfaces/services/Blog';
import * as constants from './HttpMethods';
import { ListWebService } from './ListWebService';
import { Topic } from '../models/Blog/Topic';
import { Topic as ITopic } from '../interfaces/models/Blog/Topic';
import { Paginator as IPaginator } from '../interfaces/models/Paginator';
import { Paginator } from '../models/Paginator';

export const METHOD_GET_TOPICS = '/api/v2/blog';

export const METHOD_GET_TOPIC = '/api/v2/blog/{id}';

export class Blog extends ListWebService<Topic> implements IBlogService {
    async get(): Promise<IPaginator<ITopic>> {
        let result = new Array<ITopic>();
        const response = await this.getTransport().send(METHOD_GET_TOPICS, constants.HTTP_METHOD_GET, this.prepareParams());
        response.data.forEach((element: any) => {
            result.push(this.create(element));
        });

        return new Paginator<ITopic>(result, response.meta.get('total'), response.meta.get('pageQty'), response.meta.get('ipp'));
    }

    async find(id: any): Promise<ITopic> {
        const response = await this.getTransport().send(METHOD_GET_TOPIC, constants.HTTP_METHOD_GET, new Map([
            ['id', id]
        ]));
        return this.create(response.data);
    }

    create(attributes: Map<string, any>): ITopic {
        return new Topic(attributes);
    }
}