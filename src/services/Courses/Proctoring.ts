import * as constants from '../HttpMethods';
import { WebService } from '../WebService';
import { ProctoringEvent } from '../../interfaces/models/Courses/ProctoringEvent';
import { Proctoring as IProctoring } from '../../interfaces/services/Courses/Proctoring';

export const METHOD_SEND_PROCTORING_EVENTS = '/api/v2/courses/{courseId}/tasks/{taskId}/proctoring';

/** Bigger batches are refused by the server (ProctoringService::MAX_EVENTS_PER_REQUEST) */
export const MAX_EVENTS_PER_REQUEST = 20;

/**
 * Service to report proctoring events
 */
export class Proctoring extends WebService implements IProctoring {

    /**
     * Report events collected while the task is being passed
     *
     * @param courseId
     * @param taskId
     * @param events
     */
    async send(courseId: string, taskId: string, events: ProctoringEvent[]): Promise<number> {
        if (!events || events.length === 0) {
            return 0;
        }

        const response = await this.getTransport().send(METHOD_SEND_PROCTORING_EVENTS, constants.HTTP_METHOD_POST, new Map<string, any>(
            [
                ['courseId', courseId],
                ['taskId', taskId],
                ['events', events.slice(0, MAX_EVENTS_PER_REQUEST)]
            ]
        ));

        return response.data?.get('stored') ?? 0;
    }
}
