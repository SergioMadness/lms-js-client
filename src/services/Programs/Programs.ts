import * as constants from '../HttpMethods';
import { ListWebService } from "../ListWebService";
import { Course } from '../../models/Courses/Course';
import { Program } from '../../interfaces/models/Programs/Program';
import { Program as ProgramModel } from '../../models/Programs/Program';
import { Programs as IPrograms } from '../../interfaces/services/Programs/Programs';
import { Module } from '../../models/Programs/Module';
import { Paginator as IPaginator } from '../../interfaces/models/Paginator';
import { Paginator } from '../../models/Paginator';

export const METHOD_GET_PROGRAMS = '/api/v2/programs';

export const METHOD_GET_PROGRAM = '/api/v2/programs/{id}';

/**
 * Service to work with courses
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

    create(attributes: Map<string, any>): Program {
        const modulesRaw = attributes.get('modules');
        let modules = new Array<Module>();
        for (let i in modulesRaw) {
            const coursesRaw = modulesRaw[i].courses;
            let courses = new Array<Course>();
            for (let j in coursesRaw) {
                courses.push(new Course(coursesRaw[j]));
            }
            modulesRaw[i].courses = courses;
            modules.push(new Module(modulesRaw[i]));
        }
        attributes.set('modules', modules);

        return new ProgramModel(attributes);
    }
}