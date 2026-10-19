import { ProctoringEvent } from "../../models/Courses/ProctoringEvent";

/**
 * Interface for service reporting proctoring events
 */
export interface Proctoring {

    /**
     * Report events collected while the task is being passed
     *
     * @param courseId
     * @param taskId
     * @param events Batch of events; the server refuses more than MAX_EVENTS_PER_REQUEST at once
     *
     * @return Qty of the events the server has stored
     */
    send(courseId: string, taskId: string, events: ProctoringEvent[]): Promise<number>;
}
