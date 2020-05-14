import { Model } from "../Model"
import { Course as CourseModel } from "../../interfaces/models/Courses/Course"

export class Course extends Model implements CourseModel {
    public title: string
    public alias: string
    public note: string
    public description: string

    constructor(attributes: Map<string, any>) {
        super();
        this.fill(attributes);
    }

    fill(attributes: Map<string, any>): CourseModel {
        this.title = attributes.get('title');
        this.alias = attributes.get('alias');
        this.note = attributes.get('note');
        this.description = attributes.get('description');

        return this;
    }

}