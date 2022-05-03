import { ListWebService } from './ListWebService';
import { News as NewsModel } from '../models/News/News';
import { News as INewsModel } from '../interfaces/models/News/News';
import * as constants from './HttpMethods';
import { News as INews } from '../interfaces/services/News';
import { Paginator as IPaginator } from '../interfaces/models/Paginator';
import { Paginator } from '../models/Paginator';

export const METHOD_GET_NEWS = '/api/v2/news';

export const METHOD_GET_SINGLE_NEWS = '/api/v2/news/{id}';

/**
 * Class to work with news
 */
export class News extends ListWebService<NewsModel> implements INews {
    create(attributes?: Map<string, any>): INewsModel {
        return new NewsModel(attributes);
    }

    async get(): Promise<IPaginator<INewsModel>> {
        let result = new Array<INewsModel>();
        const response = await this.getTransport().send(METHOD_GET_NEWS, constants.HTTP_METHOD_GET, this.prepareParams());
        response.data.forEach((element: any) => {
            result.push(this.create(element));
        });

        return new Paginator<INewsModel>(result, response.meta.get('total'), response.meta.get('pageQty'), response.meta.get('ipp'));
    }

    async find(id: any): Promise<INewsModel> {
        const response = await this.getTransport().send(METHOD_GET_SINGLE_NEWS, constants.HTTP_METHOD_GET, new Map([
            ['id', id]
        ]));
        return this.create(response.data);
    }
}