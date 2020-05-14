import { Model } from "../Model"
import { Task as TaskModel } from "../../interfaces/models/Courses/Task"

export class Task extends Model implements TaskModel {
    public title: string
    public alias: string
    public note: string
    public description: string

    constructor(attributes: Map<string, any>) {
        super();
        this.fill(attributes);
    }

    fill(attributes: Map<string, any>): TaskModel {
        this.title = attributes.get('title');
        this.alias = attributes.get('alias');
        this.note = attributes.get('note');
        this.description = attributes.get('description');

        return this;
    }

}