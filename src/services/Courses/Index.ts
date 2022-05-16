import { WebService } from "../WebService";
import { Index as IIndex } from "../../interfaces/services/Courses/Index";
import * as constants from "../HttpMethods";
import { IndexItem as IIndexItem } from "../../interfaces/models/Courses/Index/IndexItem";
import { IndexItem } from "../../models/Courses/Index/IndexItem";
import { Index as IndexModel } from "../../models/Courses/Index/Index";
import { Index as IIndexModel } from "../../interfaces/models/Courses/Index/Index";

export const METHOD_GET_INDEX = '/api/v2/courses/{courseId}/index';

export class Index extends WebService implements IIndex {
    async get(courseId: string): Promise<IIndexModel> {
        const response = await this.getTransport().send(METHOD_GET_INDEX, constants.HTTP_METHOD_GET, new Map([
            ['courseId', courseId]
        ]));

        return this.createIndex(response.data);
    }

    private createIndex(data: Array<Map<any, object>>): IIndexModel {
        let result = new IndexModel();

        data.forEach(item => {
            result.add(
                this.createIndexItem(item)
            );
        });

        return result;
    }

    private createIndexItem(data: Map<string, any>): IIndexItem {
        let result = new IndexItem();
        if (!(data instanceof Map)) {
            data = new Map(Object.entries(data));
        }
        result.setId(data.get('id'));
        result.setLabel(data.get('label'));
        result.setIsAvailable(data.get('isAvailable'));
        result.setIsFailed(data.get('isFailed'));
        result.setIsPassed(data.get('isPassed'));
        result.setIsSuccessful(data.get('isSuccessful'));
        result.setType(data.get('type'));

        const children = data.get('children') ?? [];
        children.forEach((item: any) => {
            result.addItem(
                this.createIndexItem(item)
            );
        });

        return result;
    }
}