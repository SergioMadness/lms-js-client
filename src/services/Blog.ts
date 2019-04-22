/// <reference path="WebService.ts" />
/// <reference path="../interfaces/services/Blog.ts" />
/// <reference path="../interfaces/models/Blog/Topic.ts" />
/// <reference path="HttpMethods.ts" />

namespace Services {
    export const METHOD_GET_TOPICS = '/api/v1/blog';

    export const METHOD_GET_TOPIC = '/api/v1/blog/{id}';

    export class Blog extends WebService<Models.Blog.Topic> implements Interfaces.Services.Blog {
        async get(): Promise<Array<Interfaces.Models.Blog.Topic>> {
            let result = new Array<Interfaces.Models.Blog.Topic>();
            const data = await this.getTransport().send(METHOD_GET_TOPICS, HTTP_METHOD_GET, this.prepareParams());
            data.forEach((element) => {
                result.push(this.create(element));
            });

            return result;
        }

        async find(id: any): Promise<Interfaces.Models.Blog.Topic>  {
            const data = await this.getTransport().send(METHOD_GET_TOPIC, HTTP_METHOD_GET, new Map([
                ['id', id]
            ]));
            return this.create(data[0]);
        }

        create(attributes: Map<string, any>): Interfaces.Models.Blog.Topic {
            return new Models.Blog.Topic(attributes);
        }
    }
}