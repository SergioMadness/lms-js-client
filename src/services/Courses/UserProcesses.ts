import * as constants from '../HttpMethods';
import { ListWebService } from '../ListWebService';
import { UserHasProcess } from 'src/models/Courses/UserProcesses/UserHasProcess';
import { UserProcesses as IUserProcesses } from '../../interfaces/services/Courses/UserProcesses';

export const METHOD_GET_USER_PROSESSES = '/api/v2/profile/processes';

export const METHOD_DELETE_USER_PROCESS = '/api/v2/profile/processes/{id}';

/**
 * Service to work with users' processes
 */
export class UserProcesses extends ListWebService<IUserProcesses> implements IUserProcesses {
    /**
     * Get list of user's processes
     */
    async get(): Promise<UserHasProcess[]> {
        let result = new Array<UserHasProcess>();
        const data = await this.getTransport().send(METHOD_GET_USER_PROSESSES, constants.HTTP_METHOD_GET, this.prepareParams());
        data.forEach((element) => {
            result.push(this.create(element));
        });

        return result;
    }

    /**
     * Create link object
     * 
     * @param attributes 
     */
    create(attributes: Map<string, any>): UserHasProcess {
        return new UserHasProcess(attributes);
    }

    /**
     * Hide link
     * 
     * @param processId 
     */
    async hide(processId: string): Promise<boolean> {
        await this.getTransport().send(METHOD_DELETE_USER_PROCESS, constants.HTTP_METHOD_DELETE, new Map([
            ['id', processId]
        ]));

        return true;
    }

    find(id: any): Promise<UserHasProcess> {
        throw new Error('Method not implemented.');
    }
}