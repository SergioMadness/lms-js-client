/// <reference path="WebService.ts" />
/// <reference path="../interfaces/services/News.ts" />
/// <reference path="../interfaces/models/News/News.ts" />
/// <reference path="HttpMethods.ts" />

namespace Services {
    export const METHOD_GET_NEWS = '/api/v1/news';

    export const METHOD_GET_SINGLE_NEWS = '/api/v1/news/{id}';

    /**
     * Class to work with news
     */
    export class News extends WebService<Models.News.News> implements Interfaces.Services.News {
        create(attributes?: Map<string, any>): Interfaces.Models.News.News {
            return new Models.News.News(attributes);
        }

        async get(): Promise<Array<Interfaces.Models.News.News>> {
            let result = new Array<Interfaces.Models.News.News>();
            const data = await this.getTransport().send(METHOD_GET_NEWS, HTTP_METHOD_GET, this.prepareParams());
            data.forEach((element) => {
                result.push(this.create(element));
            });

            return result;
        }

        async find(id: any): Promise<Interfaces.Models.News.News> {
            const data = await this.getTransport().send(METHOD_GET_SINGLE_NEWS, HTTP_METHOD_GET, new Map([
                ['id', id]
            ]));
            return this.create(data[0]);
        }
    }
}