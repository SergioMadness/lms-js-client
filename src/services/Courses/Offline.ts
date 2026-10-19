import * as constants from '../HttpMethods';
import { WebService } from '../WebService';
import { OfflinePackage } from '../../interfaces/models/Courses/OfflinePackage';
import { Offline as IOffline } from '../../interfaces/services/Courses/Offline';

export const METHOD_GET_OFFLINE_PACKAGE = '/api/v2/courses/{courseId}/offline';

/**
 * Service to fetch a course for offline learning
 */
export class Offline extends WebService implements IOffline {

    /**
     * Get the whole course in one request
     *
     * @param courseId
     * @param version
     */
    async get(courseId: string, version: string | null = null): Promise<OfflinePackage> {
        const params = new Map<string, any>([
            ['courseId', courseId]
        ]);
        if (version) {
            params.set('version', version);
        }

        const response = await this.getTransport().send(METHOD_GET_OFFLINE_PACKAGE, constants.HTTP_METHOD_GET, params);
        const data = response.data;

        return {
            version: data.get('version'),
            unchanged: data.get('unchanged') === true,
            generatedAt: data.get('generated_at') ?? null,
            course: data.get('course') ?? null,
            index: data.get('index') ?? [],
            tasks: data.get('tasks') ?? [],
            order: data.get('order') ?? [],
            media: data.get('media') ?? [],
        };
    }
}
