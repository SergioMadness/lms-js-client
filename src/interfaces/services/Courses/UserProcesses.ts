import { ListService } from "../ListService";
import { UserHasProcess } from "../../../interfaces/models/Courses/UserHasProcess";

/**
 * Interface for service to work with users' processes
 */
export interface UserProcesses extends ListService<UserHasProcess> {
    // /**
    //  * Get items
    //  */
    // get(): Promise<Array<UserHasProcess>>;

    // /**
    //  * Create model
    //  * 
    //  * @param attributes 
    //  */
    // create(attributes: object): UserHasProcess;

    /**
     * Hide process
     * 
     * @param processId 
     */
    hide(processId: string): Promise<boolean>;
}