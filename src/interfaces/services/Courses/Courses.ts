import { ListService } from "../ListService";
import { Course } from "../../../interfaces/models/Courses/Course";

/**
 * Interface for service to work with courses
 */
export interface Courses extends ListService<Course> {

    /**
     * Open the player of a SCORM course
     *
     * The answer is an address with a short-lived token in it: the player, its
     * files and its runtime are served from there without the Bearer header,
     * so a web view or a new tab can simply navigate to it.
     */
    scormLaunch(courseId: string): Promise<ScormLaunch>;
}

export interface ScormLaunch {
    url: string;
    expiresAt: string | null;
}