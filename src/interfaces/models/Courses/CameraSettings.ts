/**
 * Settings of the camera proctoring collector
 *
 * Built by the server (lms-proctoring CollectorSettings) and delivered with the
 * task. The texts are already translated.
 */
export interface CameraSettings {

    /** Camera signals the task watches */
    signals: string[];

    /** What is uploaded: a downscaled still, not a portrait */
    frame: { width: number, height: number, quality: number };

    /** Seconds between two timed frames */
    snapshotInterval: number;

    /** Frames per attempt, enforced on both sides */
    maxSnapshots: number;

    /** Seconds before the same anomaly may cost another frame */
    evidenceCooldown: number;

    /** Detections per second */
    fps: number;

    /** Seconds without a face before it is reported */
    noFaceThreshold: number;

    /** Seconds of looking away before it is reported */
    lookAwayThreshold: number;

    identity: {
        /** off | soft | hard */
        mode: string,
        /** The face has to be checked before the task */
        required: boolean,
        /** Stored decision in hard mode: null (not checked), confirmed, allowed, mismatch */
        status?: string | null,
        title: string,
        checking: string,
        failedTitle: string,
        failedText: string
    };

    consent: {
        title: string,
        text: string,
        accept: string,
        decline: string,
        hint: string
    };
}
