import { Model } from "../Model";
import { Module } from "./Module";

/**
 * Interface for program model
 */
export interface Program extends Model<Program> {

    /** Program title */
    readonly title: string;

    /** Program uri */
    readonly alias: string;

    /** Note */
    readonly note: string;

    /** Description */
    readonly description: string;

    /** Module list */
    readonly modules: Array<Module>;
}