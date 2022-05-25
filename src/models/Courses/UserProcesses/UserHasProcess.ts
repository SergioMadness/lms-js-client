import { Model } from "../../Model"
import { UserHasProcess as UserHasProcessModel } from "../../../interfaces/models/Courses/UserHasProcess"
import { Course } from "../Course";
import { Program } from "../../Programs/Program";
import { objectToMap } from '../../../services/Helpers';

export class UserHasProcess extends Model implements UserHasProcessModel {
    public till: Date;
    public progress: number;
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
        this.processType = attributes.get('process_type');
        this.process = this.processType === 'course' ? new Course(objectToMap(attributes.get('process'))) : new Program(objectToMap(attributes.get('process')));

        this.till = new Date(attributes.get('till'));
        this.progress = attributes.get('progress');
        this.finishedAt = new Date(attributes.get('finished_at'));

        return this;
    }

}