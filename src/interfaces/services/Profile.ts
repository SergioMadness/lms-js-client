import { User } from "../../interfaces/models/Users/User";

/**
 * Interface for Profile service to work with current profile
 */
export interface Profile {
    /**
     * Get profile
     */
    get(): Promise<User>;

    /**
     * Update user
     * 
     * @param user 
     */
    update(user: User): Promise<User>;
}