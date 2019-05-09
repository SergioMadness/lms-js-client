import { Model } from '../Model';
import { Package } from '../SAAS/Package';

/**
 * Interface for company model
 */
export interface Company extends Model<Company> {
    /**
     * Company name
     */
    readonly name: string;

    /**
     * Packages available to company
     */
    readonly [packages: number]: Package;
}