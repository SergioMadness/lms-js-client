import * as constants from '../HttpMethods';
import { WebService } from "../WebService";
import { Certificates as ICertificates } from '../../interfaces/services/Courses/Certificates';

export const METHOD_GET_CERTIFICATE_IMAGE = '/api/v2/certificates/{courseId}/{taskId}/image';

export class Certificates extends WebService implements ICertificates {
    async getImage(courseId: string, taskId: string): Promise<string> {
        const params = new Map();
        params.set('courseId', courseId);
        params.set('taskId', taskId);

        const response = await this.getTransport().send(METHOD_GET_CERTIFICATE_IMAGE, constants.HTTP_METHOD_GET, params);

        return response.data;
    }
}