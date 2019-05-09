import { Model } from '../Model';

/**
 * Interface for Package model
 */
export interface Package extends Model<Package> {
    /**
     * Package name
     */
    readonly name: string;

    /**
     * Package alias
     */
    readonly alias: string;
}