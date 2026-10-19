/**
 * The whole course, packed for offline learning
 *
 * The regular task method is gated by progress, so a client cannot pre-fetch a
 * course lesson by lesson: everything comes at once through /courses/{id}/offline.
 * The payload is deliberately raw - course, index and tasks carry exactly the
 * same shape the online methods return, so a client can feed them through the
 * mappers it already has.
 */
export interface OfflinePackage {

    /** Fingerprint of the content; send it back to skip an unchanged package */
    version: string;

    /** True when the version sent matched and nothing else was transferred */
    unchanged: boolean;

    /** When the package was assembled, ISO 8601 */
    generatedAt: string | null;

    /** Course as /courses/{id} returns it */
    course: any;

    /** Index tree as /courses/{id}/index returns it */
    index: any[];

    /** Every lesson as /courses/{id}/tasks/{taskId} returns it */
    tasks: any[];

    /** Lesson ids in the order they have to be passed in */
    order: string[];

    /** Absolute urls of the images the lessons refer to */
    media: string[];

    /**
     * Videos that can be taken offline: a file of the storage (<video>, <source>)
     * or a Kinescope embed (<iframe>) whose download the account allows
     */
    videos: OfflineVideo[];
}

export interface OfflineVideo {

    /** The src attribute as it stands in the html, the key the client looks it up by */
    source: string;

    /** Absolute url of the MP4 to download; may be signed and short-lived */
    url: string;

    /** Bytes, when the server knows them */
    size: number | null;
}
