import { Model } from "../Model"
import { Task as TaskModel } from "../../interfaces/models/Courses/Task"
import { Attempt } from "../../interfaces/models/Courses/Attempt";
import { TimeTracking } from "../../interfaces/models/Courses/TimeTracking";
import { CameraSettings } from "../../interfaces/models/Courses/CameraSettings";
import { TutorSettings } from "../../interfaces/models/Courses/Tutor";

export class Task extends Model implements TaskModel {
    public id: string;
    public parentId: string;
    public type: string;
    public title: string;
    public alias: string;
    public note: string;
    public description: string;
    public settings: any;
    public nextTask: Map<string, string>;
    public prevTask: Map<string, string>;
    public proctored: boolean;
    public proctoringSignals: string[];
    public attemptsLimit: number | null;
    public attemptsUsed: number;
    public attemptsLeft: number | null;
    public timeLimited: boolean;
    public timeLimit: number | null;
    public startedAt: string | null;
    public expiresAt: string | null;
    public secondsLeft: number | null;
    public timeTracking: TimeTracking | null;
    public camera: CameraSettings | null;
    public tutor: TutorSettings | null;
    public comments: boolean;
    private attempt: Attempt;

    constructor(attributes: Map<string, any>) {
        super();
        this.fill(attributes);
    }

    setAttempt(attempt: Attempt): Task {
        this.attempt = attempt;

        return this;
    }

    getAttempt(): Attempt {
        return this.attempt;
    }

    fill(attributes: Map<string, any>): TaskModel {
        this.title = attributes.get('title');
        this.alias = attributes.get('alias');
        this.note = attributes.get('note');
        this.description = attributes.get('content');
        this.type = attributes.get('action');
        this.id = attributes.get('id');
        this.parentId = attributes.get('parent_id');
        this.settings = attributes.get('settings');
        this.nextTask = attributes.get('nextTask');
        this.prevTask = attributes.get('prevTask');
        // absent for an older backend and for a guest: the task is simply not watched
        this.proctored = attributes.get('proctored') === true;
        this.proctoringSignals = attributes.get('proctoring_signals') ?? [];
        // `cool_down` is the historical name of the same limit
        this.attemptsLimit = attributes.get('attempts_limit') ?? attributes.get('cool_down') ?? null;
        this.attemptsUsed = attributes.get('attempts_used') ?? 0;
        this.attemptsLeft = attributes.get('attempts_left') ?? null;
        this.timeLimited = attributes.get('time_limited') === true;
        this.timeLimit = attributes.get('time_limit') ?? null;
        this.startedAt = attributes.get('started_at') ?? null;
        this.expiresAt = attributes.get('expires_at') ?? null;
        this.secondsLeft = attributes.get('seconds_left') ?? null;
        this.timeTracking = Task.timeTrackingOf(attributes.get('time_tracking'));
        this.camera = attributes.get('camera') ?? null;
        this.tutor = Task.tutorOf(attributes.get('tutor'));
        // the B2C answer does not carry the switch yet (only the B2B one does as
        // `comments`), and the comments API takes a question on any lesson
        this.comments = attributes.get('comments') !== false;
        if (attributes.has('attempt')) {
            this.setAttempt(attributes.get('attempt'));
        }

        return this;
    }

    /** lms-ai adds `tutor` to the lesson when the tutor of the course is on; absent otherwise */
    private static tutorOf(data: any): TutorSettings | null {
        if (!data || data.enabled !== true) {
            return null;
        }

        return {
            enabled: true,
            remainingToday: typeof data.remaining_today === 'number' ? data.remaining_today : null
        };
    }

    /** The server sends the periods with kebab-case keys */
    private static timeTrackingOf(data: any): TimeTracking | null {
        if (!data) {
            return null;
        }

        return {
            pauseAfter: data['pause-after'] ?? 20,
            idleAfter: data['idle-after'] ?? 120,
            reportInterval: data['report-interval'] ?? 30
        };
    }
}
