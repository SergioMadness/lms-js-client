import { LessonWebinar, RoomPass } from "../../models/Courses/Webinar";

/**
 * Interface for service to work with the webinar of a lesson
 */
export interface Webinars {

    /** Webinar the lesson points to */
    get(courseId: string, taskId: string): Promise<LessonWebinar>;

    /** Pass to the LiveKit room of the lesson */
    enter(courseId: string, taskId: string): Promise<RoomPass>;
}
