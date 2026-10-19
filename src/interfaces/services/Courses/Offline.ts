import { OfflinePackage } from "../../models/Courses/OfflinePackage";

/**
 * Interface for service fetching a course for offline learning
 */
export interface Offline {

    /**
     * Get the whole course in one request
     *
     * @param courseId
     * @param version Version of the package the client already holds, if any
     *
     * @return The package; `unchanged` is true when the version matched
     */
    get(courseId: string, version?: string | null): Promise<OfflinePackage>;
}
