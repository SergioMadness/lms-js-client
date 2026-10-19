import { TutorAnswer, TutorDialogue } from "../../models/Courses/Tutor";

/**
 * Interface for service to talk to the AI tutor of a course
 */
export interface Tutor {

    /** The dialogue of the student with the tutor of the course, oldest first */
    messages(courseId: string): Promise<TutorDialogue>;

    /** Ask the tutor; the lesson the student is on gives the tutor its context */
    ask(courseId: string, question: string, taskId?: string | null): Promise<TutorAnswer>;
}
