import * as constants from '../HttpMethods';
import { ListWebService } from "../ListWebService";
import { Program } from '../../interfaces/models/Programs/Program';
import { Program as ProgramModel } from '../../models/Programs/Program';
import { Programs as IPrograms } from '../../interfaces/services/Programs/Programs';
import { Paginator as IPaginator } from '../../interfaces/models/Paginator';
import { Paginator } from '../../models/Paginator';

export const METHOD_GET_PROGRAMS = '/api/v2/programs';

export const METHOD_GET_PROGRAM = '/api/v2/programs/{id}';

export const METHOD_ENROLL_PROGRAM = '/api/v2/programs/{id}/enroll';

/**
 * Service to work with programs (lms-courses B2C ProgramController)
 *
 * A program is a set of courses: holding it opens every course of it, it is
 * finished when every course is, and then it has a certificate of its own.
 */
export class Programs extends ListWebService<Program> implements IPrograms {
    async get(): Promise<IPaginator<Program>> {
        let result = new Array<Program>();
        const response = await this.getTransport().send(METHOD_GET_PROGRAMS, constants.HTTP_METHOD_GET, this.prepareParams());
        response.data.forEach((element: any) => {
            result.push(this.create(element));
        });

        return new Paginator<Program>(result, response.meta.get('total'), response.meta.get('pageQty'), response.meta.get('ipp'));
    }

    async find(id: any): Promise<Program> {
        const response = await this.getTransport().send(METHOD_GET_PROGRAM, constants.HTTP_METHOD_GET, new Map([
            ['id', id]
        ]));
        return this.create(response.data);
    }

    /**
     * Enroll into a free program (`can_enroll`); a program already held stays as it is
     *
     * @param id
     */
    async enroll(id: string): Promise<Program> {
        const response = await this.getTransport().send(METHOD_ENROLL_PROGRAM, constants.HTTP_METHOD_POST, new Map([
            ['id', id]
        ]));
        return this.create(response.data);
    }

    create(attributes: Map<string, any>): Program {
        return new ProgramModel(attributes);
    }
}
