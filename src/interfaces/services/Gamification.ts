import { Achievements, Badge, LeaderboardRow, PointsEvent } from '../models/Gamification';

export type LeaderboardPeriod = 'all' | 'month' | 'week';

/**
 * Interface for service to work with gamification
 */
export interface Gamification {
    me(): Promise<Achievements>;

    badges(): Promise<Badge[]>;

    leaderboard(period?: LeaderboardPeriod, limit?: number): Promise<LeaderboardRow[]>;

    history(limit?: number): Promise<PointsEvent[]>;

    /** Take the student off the leaderboards (points are still earned) */
    setHidden(hidden: boolean): Promise<boolean>;
}
