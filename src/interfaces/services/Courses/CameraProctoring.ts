import { CameraSettings } from "../../models/Courses/CameraSettings";
import { CameraFrame, IdentityResult, SnapshotResult } from "../../models/Courses/CameraProctoring";

/**
 * Interface for service carrying the frames of the camera proctoring
 */
export interface CameraProctoring {

    /** Collector settings, null when the camera is not watched for the task */
    config(courseId: string, taskId: string): Promise<CameraSettings | null>;

    /**
     * Upload a frame
     *
     * @param kind   baseline | periodic | evidence
     * @param signal Camera signal an evidence frame illustrates
     * @param meta   Only `faces` and `confidence` are kept
     * @param at     Moment of the frame, ISO 8601
     */
    snapshot(courseId: string, taskId: string, frame: CameraFrame, kind?: string, signal?: string | null, meta?: any, at?: string | null): Promise<SnapshotResult>;

    /** Check the face against the reference portrait of the student */
    identity(courseId: string, taskId: string, frame: CameraFrame): Promise<IdentityResult>;
}
