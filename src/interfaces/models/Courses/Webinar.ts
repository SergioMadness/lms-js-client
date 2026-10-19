/**
 * Webinar of a lesson as the student sees it
 *
 * Broadcast secrets (RTMP link, stream key, room name) never come to a client.
 */
export interface LessonWebinar {

    id: string;

    title: string;

    description: string;

    cover: string | null;

    /** kinescope | livekit */
    provider: string;

    /** pending | started | finished | canceled */
    status: string;

    /** ISO 8601 */
    startDate: string | null;

    /** Minutes */
    duration: number | null;

    /** ISO 8601, the real finish once finished */
    endsAt: string | null;

    /** A LiveKit room can be entered now */
    canEnter: boolean;

    /** Kinescope player */
    playerUrl: string | null;

    /** Kinescope chat */
    playerChatUrl: string | null;

    recordings: WebinarRecording[];

    /** A recording is going to appear after the end */
    recordingExpected: boolean;
}

export interface WebinarRecording {

    name: string;

    /** Embeddable player, null while the file is processed */
    url: string | null;

    processing: boolean;
}

/**
 * Pass to a LiveKit room
 *
 * The token also authorises the chat of the room (Bearer), which our server
 * serves over HTTP: nobody publishes data into the room directly.
 */
export interface RoomPass {

    /** wss:// of the LiveKit server */
    serverUrl: string;

    token: string;

    /** Identity of the participant in the room */
    identity: string;

    /** student | host */
    role: string;

    /** ISO 8601 */
    expiresAt: string;

    /** Base url of the chat endpoints */
    chatUrl: string;
}

export interface ChatMessage {

    id: string;

    identity: string;

    name: string;

    isHost: boolean;

    text: string;

    /** published | pending | rejected | deleted */
    status: string;

    /** Epoch ms */
    at: number;
}

export interface ChatState {

    /** open | premoderated | closed */
    mode: string;

    /** The student may not write */
    muted: boolean;

    messages: ChatMessage[];
}
