import * as constants from '../HttpMethods';
import { ListWebService } from "../ListWebService";
import { Task } from "../../interfaces/models/Courses/Task";
import { Tasks as ITasks } from "../../interfaces/services/Courses/Tasks";
import { Task as TaskModel } from '../../models/Courses/Task';

export const METHOD_GET_TASKS = '/api/v2/courses/{courseId}/tasks';

export const METHOD_GET_TASK = '/api/v2/courses/{courseId}/tasks/{taskId}';

export const METHOD_GET_SUBTASKS = '/api/v2/courses/{courseId}/tasks/{taskId}/tasks';

/**
 * Service to work with courses
 */
export class Tasks extends ListWebService<Task> implements ITasks {

    private courseId: string;

    setCourseId(id: string): ITasks {
        this.courseId = id;

        return this;
    }

    getCourseId(): string {
        return this.courseId;
    }

    prepareParams(): any {
        let result: Map<string, any>;
        result = super.prepareParams();

        result.set('courseId', this.getCourseId());

        return result;
    }

    async get(): Promise<Array<Task>> {
        let result = new Array<Task>();
        const data = await this.getTransport().send(METHOD_GET_TASKS, constants.HTTP_METHOD_GET, this.prepareParams());
        data.forEach((element) => {
            result.push(this.create(this.objectToMap(element)));
        });

        return result;
    }

    async find(id: any): Promise<Task> {
        const data = await this.getTransport().send(METHOD_GET_TASK, constants.HTTP_METHOD_GET, new Map([
            ['courseId', this.getCourseId()],
            ['id', id]
        ]));
        return this.create(this.objectToMap(data));
    }

    create(attributes: Map<string, any>): Task {
        return new TaskModel(attributes);
    }
}