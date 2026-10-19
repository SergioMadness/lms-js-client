import * as constants from '../HttpMethods';
import { WebService } from "../WebService";
import { CertificateNames, Certificates as ICertificates, IssuedCertificate, UserCertificate } from '../../interfaces/services/Courses/Certificates';

export const METHOD_GET_USER_CERTIFICATES = '/api/v2/certificates';

export const METHOD_CREATE_CERTIFICATE = '/api/v2/certificates/{courseId}/{taskId}';

export const METHOD_GET_CERTIFICATE_IMAGE = '/api/v2/certificates/{courseId}/{taskId}/image';

export const METHOD_GET_CERTIFICATE_PDF = '/api/v2/certificates/{courseId}/{taskId}/pdf';

export const METHOD_CREATE_PROGRAM_CERTIFICATE = '/api/v2/certificates/programs/{programId}';

export const METHOD_GET_PROGRAM_CERTIFICATE_PDF = '/api/v2/certificates/programs/{programId}/pdf';

/**
 * Service to work with certificates
 *
 * Refusals: 403 without a `reason` when the lessons before the certificate
 * are not passed, 403 for a program that is not finished, 404
 * `template-not-found`, 503 when the picture could not be made.
 */
export class Certificates extends WebService implements ICertificates {

    async list(): Promise<UserCertificate[]> {
        const response = await this.getTransport().send(METHOD_GET_USER_CERTIFICATES, constants.HTTP_METHOD_GET, new Map());
        // the items of a list come as maps or as plain objects, depending on the transport
        const read = (item: any, key: string) => (item instanceof Map ? item.get(key) : item[key]) ?? null;

        return (response.data || []).map((item: any) => ({
            id: read(item, 'id'),
            number: read(item, 'number'),
            createdAt: read(item, 'created_at'),
            imageUrl: read(item, 'image_url'),
            pdfUrl: read(item, 'pdf_url'),
            processType: read(item, 'process_type'),
            processId: read(item, 'process_id'),
            title: read(item, 'title'),
        }));
    }

    /**
     * Show the certificate of a course
     *
     * Only the `image` method stores the attempt of the certificate lesson, and
     * only when it creates the certificate, so it goes first. It answers with a
     * redirect to the picture, which is of no use here (and may be refused by
     * CORS in a browser after the server has done its part); the urls come from
     * the POST that follows.
     */
    async view(courseId: string, taskId: string): Promise<IssuedCertificate> {
        try {
            await this.getTransport().send(METHOD_GET_CERTIFICATE_IMAGE, constants.HTTP_METHOD_GET, Certificates.params(courseId, taskId));
        } catch (e) {
            if (e && e.response && e.response.status >= 400 && e.response.status < 500) {
                throw e;
            }
        }

        return this.issue(courseId, taskId);
    }

    async issue(courseId: string, taskId: string, names: CertificateNames = {}): Promise<IssuedCertificate> {
        const params = Certificates.params(courseId, taskId);
        Certificates.withNames(params, names);
        const response = await this.getTransport().send(METHOD_CREATE_CERTIFICATE, constants.HTTP_METHOD_POST, params);

        return Certificates.certificateOf(response.data);
    }

    /** The answer is the stored model, not wrapped: the url is in `settings.pdf_path` */
    async pdf(courseId: string, taskId: string): Promise<string | null> {
        const response = await this.getTransport().send(METHOD_GET_CERTIFICATE_PDF, constants.HTTP_METHOD_GET, Certificates.params(courseId, taskId));

        return Certificates.pdfOf(response.data);
    }

    /** A certificate issued already comes back as it is, without a new picture */
    async issueForProgram(programId: string): Promise<IssuedCertificate> {
        const response = await this.getTransport().send(METHOD_CREATE_PROGRAM_CERTIFICATE, constants.HTTP_METHOD_POST, new Map([
            ['programId', programId]
        ]));

        return Certificates.certificateOf(response.data);
    }

    async programPdf(programId: string): Promise<string | null> {
        const response = await this.getTransport().send(METHOD_GET_PROGRAM_CERTIFICATE_PDF, constants.HTTP_METHOD_GET, new Map([
            ['programId', programId]
        ]));

        return Certificates.pdfOf(response.data);
    }

    private static params(courseId: string, taskId: string): Map<string, any> {
        return new Map<string, any>([
            ['courseId', courseId],
            ['taskId', taskId]
        ]);
    }

    private static withNames(params: Map<string, any>, names: CertificateNames): void {
        if (names.firstName) {
            params.set('first_name', names.firstName);
        }
        if (names.middleName) {
            params.set('middle_name', names.middleName);
        }
        if (names.lastName) {
            params.set('last_name', names.lastName);
        }
    }

    private static certificateOf(data: Map<string, any>): IssuedCertificate {
        return {
            id: String(data.get('id') ?? ''),
            number: String(data.get('number') ?? ''),
            createdAt: data.get('created_at') ?? null,
            imageUrl: data.get('image_url') || null,
            pdfUrl: data.get('pdf_path') || null
        };
    }

    private static pdfOf(data: Map<string, any>): string | null {
        const settings = data instanceof Map ? data.get('settings') : null;

        return (settings && settings.pdf_path) || null;
    }
}
