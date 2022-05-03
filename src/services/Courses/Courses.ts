import * as constants from '../HttpMethods';
import { ListWebService } from "../ListWebService";
import { Course } from "../../interfaces/models/Courses/Course";
import { Courses as ICourses } from "../../interfaces/services/Courses/Courses";
import { Course as CourseModel } from '../../models/Courses/Course';
import { Paginator as IPaginator } from '../../interfaces/models/Paginator';
import { Paginator } from '../../models/Paginator';

export const METHOD_GET_COURSES = '/api/v2/courses';

export const METHOD_GET_COURSE = '/api/v2/courses/{id}';

/**
 * Service to work with courses
 */
export class Courses extends ListWebService<Course> implements ICourses {
    async get(): Promise<IPaginator<Course>> {
        let result = new Array<Course>();
        const response = await this.getTransport().send(METHOD_GET_COURSES, constants.HTTP_METHOD_GET, this.prepareParams());
        console.log(response);
        response.data.forEach((element: any) => {
            result.push(this.create(element));
        });

        return new Paginator<Course>(result, response.meta.get('total'), response.meta.get('pageQty'), response.meta.get('ipp'));
    }

    async find(id: any): Promise<Course> {
        const response = await this.getTransport().send(METHOD_GET_COURSE, constants.HTTP_METHOD_GET, new Map([
            ['id', id]
        ]));
        return this.create(response.data);
    }

    create(attributes: Map<string, any>): Course {
        return new CourseModel(attributes);
    }
}