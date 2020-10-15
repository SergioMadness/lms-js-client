import { Model } from "../../Model"
import { UserHasProcess as UserHasProcessModel } from "../../../interfaces/models/Courses/UserHasProcess"
import { Course } from "../Course";
import { Program } from "../../Programs/Program";
import { objectToMap } from '../../../services/Helpers';

export class UserHasProcess extends Model implements UserHasProcessModel {
    public processId: string;
    public title: string;
    public userId: number;
    public till: Date;
    public fullAccess: boolean;
    public progress: number;
    public createdAt: Date;
    public updatedAt: Date;
    public processType: string;
    public finishedAt: Date;
    public process: any;

    constructor(attributes: Map<string, any>) {
        super();
        this.fill(attributes);
    }

    getTill(): Date {
        return this.till;
    }

    getProgress(): number {
        return this.progress;
    }

    isFinished(): boolean {
        return this.getProgress() === 100;
    }

    getFinishDate(): Date {
        return this.finishedAt;
    }

    fill(attributes: Map<string, any>): UserHasProcessModel {
        this.id = attributes.get('id');
        this.title = attributes.get('title');
        this.processId = attributes.get('preocess_id');
        this.userId = attributes.get('user_id');
        this.till = new Date(attributes.get('till'));
        this.fullAccess = attributes.get('full_access');
        this.progress = attributes.get('progress');
        this.createdAt = new Date(attributes.get('created_at'));
        this.updatedAt = new Date(attributes.get('updated_at'));
        this.finishedAt = new Date(attributes.get('finished_at'));
        this.processType = attributes.get('process_type');
        this.process = this.processType === 'course' ? new Course(objectToMap(attributes.get('process'))) : new Program(objectToMap(attributes.get('process')));

        return this;
    }

}