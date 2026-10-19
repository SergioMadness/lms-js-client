import axios from 'axios';
import { ChatMessage, ChatState } from '../../interfaces/models/Courses/Webinar';
import { rtrim } from '../Strings';

/** The server refuses longer messages */
export const MAX_CHAT_MESSAGE_LENGTH = 1000;

/**
 * Chat of a webinar room
 *
 * Served by our server, not by LiveKit, and authorised by the room pass rather
 * than by the API token: it lives on its own url (`chat_url` of the pass) and
 * answers without the `data` envelope. New messages arrive through the room as
 * data packets with the topic `chat`; this service reads the history and posts.
 */
export class WebinarChat {

    private readonly url: string;

    private readonly token: string;

    constructor(chatUrl: string, token: string) {
        this.url = rtrim(chatUrl, '/');
        this.token = token;
    }

    /** History (the latest 200), mode of the chat and whether the student is muted */
    async state(): Promise<ChatState> {
        const response = await axios.get(this.url + '/messages', { headers: this.headers() });
        const data = response.data ?? {};

        return {
            mode: data.mode ?? 'open',
            muted: data.muted === true,
            messages: (data.messages ?? []).map(WebinarChat.message)
        };
    }

    /**
     * Post a message
     *
     * A premoderated chat answers with a `pending` message only the author sees.
     * 403 means the chat is closed, the student is muted or the webinar is over;
     * 429 - too fast (5 messages in 10 s).
     */
    async post(text: string): Promise<ChatMessage> {
        const response = await axios.post(this.url + '/messages', { text: text.slice(0, MAX_CHAT_MESSAGE_LENGTH) }, { headers: this.headers() });

        return WebinarChat.message(response.data);
    }

    static message(data: any): ChatMessage {
        return {
            id: data.id,
            identity: data.identity,
            name: data.name ?? '',
            isHost: data.isHost === true,
            text: data.text ?? '',
            status: data.status ?? 'published',
            at: data.at ?? Date.now()
        };
    }

    private headers(): any {
        return {
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        };
    }
}
