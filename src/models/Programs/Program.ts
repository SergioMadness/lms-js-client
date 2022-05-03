import { Model } from "../Model"
import { Program as IProgram } from "../../interfaces/models/Programs/Program";
import { Module } from "../../interfaces/models/Programs/Module";

export class Program extends Model implements IProgram {
    public title: string;
    public alias: string;
    public note: string;
    public description: string;
    public type: string;
    public modules: Module[];

    constructor(attributes: Map<string, any>) {
        super();
        this.fill(attributes);
    }

    fill(attributes: Map<string, any>): IProgram {
        this.id = attributes.get('id');
        this.title = attributes.get('title');
        this.alias = attributes.get('alias');
        this.note = attributes.get('note');
        this.description = attributes.get('description');
        this.type = attributes.get('type');
        this.modules = attributes.get('modules');

        return this;
    }

}