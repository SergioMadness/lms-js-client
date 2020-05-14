import { WebService } from "../WebService";
import { Index as IIndex } from "../../interfaces/services/Courses/Index";
import { Course } from "../../interfaces/models/Courses/Course";
import * as constants from "../HttpMethods";
import { IndexItem as IIndexItem } from "../../interfaces/models/Courses/Index/IndexItem";
import { IndexItem } from "../../models/Courses/Index/IndexItem";
import { Index as IndexModel } from "../../models/Courses/Index/Index";
import { Index as IIndexModel } from "../../interfaces/models/Courses/Index/Index";

export const METHOD_GET_INDEX = '/api/v2/courses/{courseId}/index';

export class Index extends WebService implements IIndex {
    async get(course: Course): Promise<IIndexModel> {
        const data = await this.getTransport().send(METHOD_GET_INDEX, constants.HTTP_METHOD_GET, new Map([
            ['courseId', course.id]
        ]));

        return this.createIndex(data);
    }

    private createIndex(data: Array<any>): IIndexModel {
        let result = new IndexModel();

        for (let i in data) {
            result.add(
                this.createIndexItem(
                    this.objectToMap(data[i])
                )
            );
        }

        return result;
    }

    private createIndexItem(data: Map<string, any>): IIndexItem {
        let result = new IndexItem();
        result.setId(data.get('id'));
        result.setLabel(data.get('label'));
        result.setIsAvailable(data.get('isAvailable'));
        result.setIsFailed(data.get('isFailed'));
        result.setIsPassed(data.get('isPassed'));
        result.setIsSuccessful(data.get('isSuccessful'));

        const children = data.get('children') ?? [];
        for (let i in children) {
            result.addItem(this.createIndexItem(this.objectToMap(children[i])));
        }

        return result;
    }
}