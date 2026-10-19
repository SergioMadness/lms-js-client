/**
 * Frame of the camera collector
 *
 * On React Native a file is `{uri, name, type}`, in a browser a Blob.
 */
export interface CameraFrame {
    uri?: string;
    name?: string;
    type?: string;
    [key: string]: any;
}

/**
 * Answer of the identity check
 *
 * - confirmed / unknown: go on (unknown is a soft mode or an unavailable model);
 * - mismatch: blocking, a tutor has to allow the attempt;
 * - retry: nothing decided yet, send another frame after `retryAfter` seconds.
 */
export interface IdentityResult {

    status: string;

    blocking: boolean;

    /** Seconds before the next check is taken, set when the checks are throttled */
    retryAfter: number | null;
}

export interface SnapshotResult {

    stored: boolean;

    id: string | null;
}
