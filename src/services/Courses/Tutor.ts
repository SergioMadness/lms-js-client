import * as constants from '../HttpMethods';
import { WebService } from '../WebService';
import { TutorAnswer, TutorDialogue, TutorMessage } from '../../interfaces/models/Courses/Tutor';
import { Tutor as ITutor } from '../../interfaces/services/Courses/Tutor';

export const METHOD_TUTOR_MESSAGES = '/api/v2/courses/{courseId}/tutor/messages';

export const METHOD_TUTOR_ASK = '/api/v2/courses/{courseId}/tutor/ask';

/**
 * Service to talk to the AI tutor of a course
 *
 * Refusals carry a reason (lms-ai TutorRefusal): tutor_unavailable / no_access
 * (403), too_fast / daily_limit (429), no_questions (402), busy (503),
 * failed (502). The message of the server is already translated.
 */
export class Tutor extends WebService implements ITutor {

    /**
     * The dialogue of the student with the tutor of the course
     *
     * @param courseId
     */
    async messages(courseId: string): Promise<TutorDialogue> {
        const response = await this.getTransport().send(METHOD_TUTOR_MESSAGES, constants.HTTP_METHOD_GET, new Map<string, any>([
            ['courseId', courseId]
        ]));
        const data = response.data;

        return {
            messages: (data.get('messages') ?? []).map(Tutor.messageOf),
            remainingToday: Tutor.remainingOf(data.get('remaining_today'))
        };
    }

    /**
     * Ask the tutor
     *
     * @param courseId
     * @param question
     * @param taskId   Lesson the student is on; its text is the context of the answer
     */
    async ask(courseId: string, question: string, taskId: string | null = null): Promise<TutorAnswer> {
        const params = new Map<string, any>([
            ['courseId', courseId],
            ['question', question]
        ]);
        if (taskId) {
            params.set('task_id', taskId);
        }
        const response = await this.getTransport().send(METHOD_TUTOR_ASK, constants.HTTP_METHOD_POST, params);
        const data = response.data;

        return {
            answer: Tutor.messageOf(data.get('answer') ?? {}),
            remainingToday: Tutor.remainingOf(data.get('remaining_today'))
        };
    }

    private static messageOf(item: any): TutorMessage {
        return {
            id: String(item.id ?? ''),
            role: item.role ?? 'assistant',
            text: item.text ?? '',
            taskId: item.task_id ?? null,
            createdAt: item.created_at ?? null
        };
    }

    private static remainingOf(value: any): number | null {
        return typeof value === 'number' ? value : null;
    }
}
