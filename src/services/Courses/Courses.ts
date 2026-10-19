import * as constants from '../HttpMethods';
import { ListWebService } from "../ListWebService";
import { Course } from "../../interfaces/models/Courses/Course";
import { Courses as ICourses, ScormLaunch } from "../../interfaces/services/Courses/Courses";
import { Course as CourseModel } from '../../models/Courses/Course';
import { Paginator as IPaginator } from '../../interfaces/models/Paginator';
import { Paginator } from '../../models/Paginator';

export const METHOD_GET_COURSES = '/api/v2/courses';

export const METHOD_GET_COURSE = '/api/v2/courses/{id}';

export const METHOD_SCORM_LAUNCH = '/api/v2/courses/{courseId}/scorm/launch';

/**
 * Service to work with courses
 */
export class Courses extends ListWebService<Course> implements ICourses {
    async get(): Promise<IPaginator<Course>> {
        let result = new Array<Course>();
        const response = await this.getTransport().send(METHOD_GET_COURSES, constants.HTTP_METHOD_GET, this.prepareParams());
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

    async scormLaunch(courseId: string): Promise<ScormLaunch> {
        const response = await this.getTransport().send(METHOD_SCORM_LAUNCH, constants.HTTP_METHOD_POST, new Map([
            ['courseId', courseId]
        ]));

        return {
            url: response.data.get('url'),
            expiresAt: response.data.get('expires_at') ?? null,
        };
    }

    create(attributes: Map<string, any>): Course {
        return new CourseModel(attributes);
    }
}