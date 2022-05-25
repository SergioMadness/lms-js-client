import * as constants from '../HttpMethods';
import { ListWebService } from '../ListWebService';
import { UserHasProcess } from '../../models/Courses/UserProcesses/UserHasProcess';
import { UserProcesses as IUserProcesses } from '../../interfaces/services/Courses/UserProcesses';
import { Paginator as IPaginator } from '../../interfaces/models/Paginator';
import { Paginator } from '../../models/Paginator';

export const METHOD_GET_USER_PROSESSES = '/api/v2/profile/processes';

export const METHOD_DELETE_USER_PROCESS = '/api/v2/profile/processes/{id}';

/**
 * Service to work with users' processes
 */
export class UserProcesses extends ListWebService<IUserProcesses> implements IUserProcesses {
    /**
     * Get list of user's processes
     */
    async get(): Promise<Array<UserHasProcess>> {
        let result = new Array<UserHasProcess>();
        const response = await this.getTransport().send(METHOD_GET_USER_PROSESSES, constants.HTTP_METHOD_GET, this.prepareParams());
        response.data.forEach((element: any) => {
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