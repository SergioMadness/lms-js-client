import * as constants from '../HttpMethods';
import { WebService } from '../WebService';
import { LessonWebinar, RoomPass, WebinarRecording } from '../../interfaces/models/Courses/Webinar';
import { Webinars as IWebinars } from '../../interfaces/services/Courses/Webinars';

export const METHOD_GET_LESSON_WEBINAR = '/api/v2/courses/{courseId}/tasks/{taskId}/webinar';

export const METHOD_ENTER_LESSON_WEBINAR = '/api/v2/courses/{courseId}/tasks/{taskId}/webinar/enter';

/**
 * Service to work with the webinar of a lesson
 *
 * Refusals carry a reason: the one of the course (need_to_pay, need_progress,
 * not_published, no_access), not_webinar / not_found / not_livekit (404),
 * canceled / finished (409), feature_unavailable (403).
 */
export class Webinars extends WebService implements IWebinars {

    /**
     * Webinar the lesson points to
     *
     * @param courseId
     * @param taskId
     */
    async get(courseId: string, taskId: string): Promise<LessonWebinar> {
        const response = await this.getTransport().send(METHOD_GET_LESSON_WEBINAR, constants.HTTP_METHOD_GET, new Map<string, any>([
            ['courseId', courseId],
            ['taskId', taskId]
        ]));
        const data = response.data;

        return {
            id: data.get('id'),
            title: data.get('title') ?? '',
            description: data.get('description') ?? '',
            cover: data.get('cover') ?? null,
            provider: data.get('provider'),
            status: data.get('status'),
            startDate: data.get('start_date') ?? null,
            duration: data.get('duration') ?? null,
            endsAt: data.get('ends_at') ?? null,
            canEnter: data.get('can_enter') === true,
            playerUrl: data.get('player_url') ?? null,
            playerChatUrl: data.get('player_chat_url') ?? null,
            recordings: (data.get('recordings') ?? []).map((item: any): WebinarRecording => ({
                name: item.name ?? '',
                url: item.url ?? null,
                processing: item.processing === true
            })),
            recordingExpected: data.get('recording_expected') === true
        };
    }

    /**
     * Pass to the LiveKit room of the lesson
     *
     * @param courseId
     * @param taskId
     */
    async enter(courseId: string, taskId: string): Promise<RoomPass> {
        const response = await this.getTransport().send(METHOD_ENTER_LESSON_WEBINAR, constants.HTTP_METHOD_POST, new Map<string, any>([
            ['courseId', courseId],
            ['taskId', taskId]
        ]));
        const data = response.data;

        return {
            serverUrl: data.get('server_url'),
            token: data.get('token'),
            identity: data.get('identity'),
            role: data.get('role'),
            expiresAt: data.get('expires_at'),
            chatUrl: data.get('chat_url')
        };
    }
}
