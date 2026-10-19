import * as constants from '../HttpMethods';
import { WebService } from '../WebService';
import { CameraSettings } from '../../interfaces/models/Courses/CameraSettings';
import { CameraFrame, IdentityResult, SnapshotResult } from '../../interfaces/models/Courses/CameraProctoring';
import { CameraProctoring as ICameraProctoring } from '../../interfaces/services/Courses/CameraProctoring';

export const METHOD_CAMERA_CONFIG = '/api/v2/courses/{courseId}/tasks/{taskId}/proctoring/camera/config';

export const METHOD_CAMERA_SNAPSHOT = '/api/v2/courses/{courseId}/tasks/{taskId}/proctoring/camera/snapshot';

export const METHOD_CAMERA_IDENTITY = '/api/v2/courses/{courseId}/tasks/{taskId}/proctoring/camera/identity';

/** Kinds of the frames the collector takes itself */
export const SNAPSHOT_BASELINE = 'baseline';
export const SNAPSHOT_PERIODIC = 'periodic';
export const SNAPSHOT_EVIDENCE = 'evidence';

/**
 * Camera proctoring (lms-proctoring)
 *
 * The camera signals themselves (no_face, camera_denied, ...) go through the
 * core proctoring service like the behavioural ones; this one carries frames.
 * Order in the hard identity mode: start the task, then check the identity,
 * then answer - starting drops a confirmation taken before it.
 */
export class CameraProctoring extends WebService implements ICameraProctoring {

    async config(courseId: string, taskId: string): Promise<CameraSettings | null> {
        const response = await this.getTransport().send(METHOD_CAMERA_CONFIG, constants.HTTP_METHOD_GET, new Map<string, any>([
            ['courseId', courseId],
            ['taskId', taskId]
        ]));
        const data = response.data;
        if (!data || data.get('enabled') !== true) {
            return null;
        }

        return Object.fromEntries(data) as any;
    }

    async snapshot(courseId: string, taskId: string, frame: CameraFrame, kind: string = SNAPSHOT_PERIODIC, signal: string | null = null, meta: any = null, at: string | null = null): Promise<SnapshotResult> {
        const params = new Map<string, any>([
            ['courseId', courseId],
            ['taskId', taskId],
            ['frame', frame],
            ['kind', kind]
        ]);
        if (signal) {
            params.set('signal', signal);
        }
        Object.keys(meta ?? {}).forEach((key) => params.set('meta[' + key + ']', String(meta[key])));
        if (at) {
            params.set('at', at);
        }
        const response = await this.getTransport().sendMultipart(METHOD_CAMERA_SNAPSHOT, params);

        return {
            stored: response.data?.get('stored') === true,
            id: response.data?.get('id') ?? null
        };
    }

    async identity(courseId: string, taskId: string, frame: CameraFrame): Promise<IdentityResult> {
        const response = await this.getTransport().sendMultipart(METHOD_CAMERA_IDENTITY, new Map<string, any>([
            ['courseId', courseId],
            ['taskId', taskId],
            ['frame', frame]
        ]));
        const retryAfter = response.data?.get('retry_after');

        return {
            status: response.data?.get('status') ?? 'unknown',
            blocking: response.data?.get('blocking') === true,
            retryAfter: typeof retryAfter === 'number' ? retryAfter : null
        };
    }
}
