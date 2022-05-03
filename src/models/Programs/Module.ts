import { Model } from "../Model";
import { Course } from "../../interfaces/models/Courses/Course";
import { Module as IModule } from '../../interfaces/models/Programs/Module';

/**
 * Module model
 */
export class Module extends Model implements IModule {
    public title: string;
    public isVariadic: boolean;
    public isSelected: boolean;
    public courses: Course[];

    constructor(attributes: Map<string, any>) {
        super();
        this.fill(attributes);
    }

    fill(attributes: Map<string, any>): IModule {
        this.id = attributes.get('id');
        this.isVariadic = attributes.get('is_variadic');
        this.isSelected = attributes.get('is_selected');
        this.courses = attributes.get('courses');

        return this;
    }

}