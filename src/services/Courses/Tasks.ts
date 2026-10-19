import * as constants from '../HttpMethods';
import { ListWebService } from "../ListWebService";
import { Task } from "../../interfaces/models/Courses/Task";
import { Tasks as ITasks } from "../../interfaces/services/Courses/Tasks";
import { Task as TaskModel } from '../../models/Courses/Task';
import { Paginator as IPaginator } from '../../interfaces/models/Paginator';
import { Paginator } from '../../models/Paginator';
import { TaskDeadline } from '../../interfaces/models/Courses/TaskDeadline';

export const METHOD_GET_TASKS = '/api/v2/courses/{courseId}/tasks';

export const METHOD_GET_TASK = '/api/v2/courses/{courseId}/tasks/{taskId}';

export const METHOD_GET_SUBTASKS = '/api/v2/courses/{courseId}/tasks/{taskId}/tasks';

export const METHOD_START_TASK = '/api/v2/courses/{courseId}/tasks/{taskId}/start';

export const METHOD_REPORT_TIME = '/api/v2/courses/{courseId}/tasks/{taskId}/time';

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

    async get(): Promise<IPaginator<Task>> {
        let result = new Array<Task>();
        const response = await this.getTransport().send(METHOD_GET_TASKS, constants.HTTP_METHOD_GET, this.prepareParams());
        response.data.forEach((element:any) => {
            result.push(this.create(element));
        });

        return new Paginator<Task>(result, response.meta.get('total'), response.meta.get('pageQty'), response.meta.get('ipp'));
    }

    async find(id: any, retake: boolean = false): Promise<Task> {
        const params = new Map<string, any>([
            ['courseId', this.getCourseId()],
            ['taskId', id]
        ]);
        if (retake) {
            params.set('retake', 1);
        }
        const response = await this.getTransport().send(METHOD_GET_TASK, constants.HTTP_METHOD_GET, params);

        return this.create(response.data);
    }

    async start(id: string, retake: boolean = false): Promise<TaskDeadline> {
        const params = new Map<string, any>([
            ['courseId', this.getCourseId()],
            ['taskId', id]
        ]);
        if (retake) {
            params.set('retake', 1);
        }
        const response = await this.getTransport().send(METHOD_START_TASK, constants.HTTP_METHOD_POST, params);

        return {
            expiresAt: response.data?.get('expires_at') ?? null,
            secondsLeft: response.data?.get('seconds_left') ?? null
        };
    }

    async reportTime(id: string, seconds: number): Promise<number> {
        const response = await this.getTransport().send(METHOD_REPORT_TIME, constants.HTTP_METHOD_POST, new Map<string, any>([
            ['courseId', this.getCourseId()],
            ['taskId', id],
            ['seconds', Math.max(0, Math.floor(seconds))]
        ]));

        return response.data?.get('seconds') ?? 0;
    }

    create(attributes: Map<string, any>): Task {
        return new TaskModel(attributes);
    }
}
