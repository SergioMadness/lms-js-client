import { WebService } from './WebService';
import { News as NewsModel } from '../models/News/News';
import { News as INewsModel } from '../interfaces/models/News/News';
import * as constants from './HttpMethods';
import { News as INews } from '../interfaces/services/News';

export const METHOD_GET_NEWS = '/api/v2/news';

export const METHOD_GET_SINGLE_NEWS = '/api/v2/news/{id}';

/**
 * Class to work with news
 */
export class News extends WebService<NewsModel> implements INews {
    create(attributes?: Map<string, any>): INewsModel {
        return new NewsModel(attributes);
    }

    async get(): Promise<Array<INewsModel>> {
        let result = new Array<INewsModel>();
        const data = await this.getTransport().send(METHOD_GET_NEWS, constants.HTTP_METHOD_GET, this.prepareParams());
        data.forEach((element) => {
            result.push(this.create(this.objectToMap(element)));
        });

        return result;
    }

    async find(id: any): Promise<INewsModel> {
        const data = await this.getTransport().send(METHOD_GET_SINGLE_NEWS, constants.HTTP_METHOD_GET, new Map([
            ['id', id]
        ]));
        return this.create(this.objectToMap(data));
    }
}