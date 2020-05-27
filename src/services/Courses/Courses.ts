import * as constants from '../HttpMethods';
import { ListWebService } from "../ListWebService";
import { Course } from "../../interfaces/models/Courses/Course";
import { Courses as ICourses } from "../../interfaces/services/Courses/Courses";
import { Course as CourseModel } from '../../models/Courses/Course';

export const METHOD_GET_COURSES = '/api/v2/courses';

export const METHOD_GET_COURSE = '/api/v2/courses/{id}';

/**
 * Service to work with courses
 */
export class Courses extends ListWebService<Course> implements ICourses {
    async get(): Promise<Array<Course>> {
        let result = new Array<Course>();
        const data = await this.getTransport().send(METHOD_GET_COURSES, constants.HTTP_METHOD_GET, this.prepareParams());
        data.forEach((element) => {
            result.push(this.create(element));
        });

        return result;
    }

    async find(id: any): Promise<Course> {
        const data = await this.getTransport().send(METHOD_GET_COURSE, constants.HTTP_METHOD_GET, new Map([
            ['id', id]
        ]));
        return this.create(data.shift());
    }

    create(attributes: Map<string, any>): Course {
        return new CourseModel(attributes);
    }
}