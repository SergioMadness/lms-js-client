import { Blog as IBlogService } from '../interfaces/services/Blog';
import * as constants from './HttpMethods';
import { WebService } from './WebService';
import { Topic } from '../models/Blog/Topic';
import { Topic as ITopic } from '../interfaces/models/Blog/Topic';

export const METHOD_GET_TOPICS = '/api/v1/blog';

export const METHOD_GET_TOPIC = '/api/v1/blog/{id}';

export class Blog extends WebService<Topic> implements IBlogService {
    async get(): Promise<Array<ITopic>> {
        let result = new Array<ITopic>();
        const data = await this.getTransport().send(METHOD_GET_TOPICS, constants.HTTP_METHOD_GET, this.prepareParams());
        data.forEach((element) => {
            result.push(this.create(element));
        });

        return result;
    }

    async find(id: any): Promise<ITopic> {
        const data = await this.getTransport().send(METHOD_GET_TOPIC, constants.HTTP_METHOD_GET, new Map([
            ['id', id]
        ]));
        return this.create(data[0]);
    }

    create(attributes: Map<string, any>): ITopic {
        return new Topic(attributes);
    }
}