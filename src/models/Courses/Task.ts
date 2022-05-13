import { Model } from "../Model"
import { Task as TaskModel } from "../../interfaces/models/Courses/Task"

export class Task extends Model implements TaskModel {
    public id: string;
    public parentId: string;
    public type: string;
    public title: string;
    public alias: string;
    public note: string;
    public description: string;
    public settings: any;
    public nextTask: Map<string, string>;
    public prevTask: Map<string, string>;

    constructor(attributes: Map<string, any>) {
        super();
        this.fill(attributes);
    }

    fill(attributes: Map<string, any>): TaskModel {
        this.title = attributes.get('title');
        this.alias = attributes.get('alias');
        this.note = attributes.get('note');
        this.description = attributes.get('content');
        this.type = attributes.get('action');
        this.id = attributes.get('id');
        this.parentId = attributes.get('parent_id');
        this.settings = attributes.get('settings');
        this.nextTask = attributes.get('nextTask');
        this.prevTask = attributes.get('prevTask');

        return this;
    }

}