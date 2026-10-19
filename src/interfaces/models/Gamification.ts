/**
 * Gamification of a school (lms-gamification): points, the streak of days,
 * badges and the leaderboard of the company. There are no levels.
 */

/** A badge of the school with the progress of the student towards it */
export interface Badge {
    id: string;
    title: string;
    description: string;
    /** File id in the storage, no url is given */
    iconId: string | null;
    /** points_total | tasks_completed | courses_finished | streak_days | perfect_tasks */
    condition: string | null;
    threshold: number;
    /** 0 for an earned badge */
    progress: number;
    /** 0..100 */
    percent: number;
    isEarned: boolean;
    /** "Y-m-d H:i:s" */
    awardedAt: string | null;
}

/** What the student has */
export interface Achievements {
    points: number;
    currentStreak: number;
    maxStreak: number;
    /** Null when hidden or without points */
    rank: number | null;
    isHidden: boolean;
    badges: Badge[];
}

export interface LeaderboardRow {
    rank: number;
    userId: string;
    name: string;
    points: number;
    streak: number;
}

/** A line of the ledger of points */
export interface PointsEvent {
    /** attempt.finished | attempt.success | task.first-success | task.perfect | course.finished | streak.day */
    event: string;
    points: number;
    subjectId: string | null;
    /** task | course */
    subjectType: string | null;
    createdAt: string | null;
}
