import { Model } from "../Model"
import { Task as TaskModel } from "../../interfaces/models/Courses/Task"
import { Attempt } from "../../interfaces/models/Courses/Attempt";

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
    private attempt: Attempt;

    constructor(attributes: Map<string, any>) {
        super();
        this.fill(attributes);
    }

    setAttempt(attempt: Attempt): Task {
        this.attempt = attempt;

        return this;
    }

    getAttempt(): Attempt {
        return this.attempt;
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
        if (attributes.has('attempt')) {
            this.setAttempt(attributes.get('attempt'));
        }

        return this;
    }

}