import { Attempts as IAttempts } from '../../interfaces/services/Attempts/Attempts';
import { Attempt as IAttempt } from '../../interfaces/models/Courses/Attempt';
import { WebService } from '../WebService';
import * as constants from '../HttpMethods';
import { Attempt } from '../../models/Courses/Attempt';

export const METHOD_GET_ATTEMPT = '/api/v2/courses/{courseId}/tasks/{taskId}/attempt';

export const METHOD_SEND_ATTEMPT = '/api/v2/courses/{courseId}/tasks/{taskId}/attempt';

/**
 * Service to work with attempts
 */
export class Attempts extends WebService implements IAttempts {
    /**
     * Get taskattempt
     * 
     * @param courseId
     * @param taskId 
     */
    async get(courseId: string, taskId: string): Promise<IAttempt> {
        const response = await this.getTransport().send(METHOD_GET_ATTEMPT, constants.HTTP_METHOD_GET, new Map<string, string>([
            ['courseId', courseId],
            ['taskId', taskId]
        ]));

        return new Attempt(response.data);
    }

    /**
     * Save attempt
     * 
     * @param courseId
     * @param taskId 
     * @param data 
     */
    async save(courseId: string, taskId: string, data: any): Promise<IAttempt> {
        const response = await this.getTransport().send(METHOD_SEND_ATTEMPT, constants.HTTP_METHOD_POST, new Map<string, any>(
            [
                ['courseId', courseId],
                ['taskId', taskId],
                ['answer', data]
            ]
        ));

        return new Attempt(response.data);
    }
}