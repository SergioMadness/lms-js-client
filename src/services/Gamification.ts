import * as constants from './HttpMethods';
import { WebService } from './WebService';
import { Achievements, Badge, LeaderboardRow, PointsEvent } from '../interfaces/models/Gamification';
import { Gamification as IGamification, LeaderboardPeriod } from '../interfaces/services/Gamification';

export const METHOD_GAMIFICATION_ME = '/api/v2/gamification/me';

export const METHOD_GAMIFICATION_BADGES = '/api/v2/gamification/badges';

export const METHOD_GAMIFICATION_LEADERBOARD = '/api/v2/gamification/leaderboard';

export const METHOD_GAMIFICATION_HISTORY = '/api/v2/gamification/history';

export const METHOD_GAMIFICATION_VISIBILITY = '/api/v2/gamification/visibility';

/**
 * Service to work with gamification
 *
 * Every method answers 403 `feature_unavailable` when the school has not the
 * module.
 */
export class Gamification extends WebService implements IGamification {

    async me(): Promise<Achievements> {
        const response = await this.getTransport().send(METHOD_GAMIFICATION_ME, constants.HTTP_METHOD_GET, new Map());
        const data = response.data;

        return {
            points: Number(data.get('points') ?? 0),
            currentStreak: Number(data.get('current_streak') ?? 0),
            maxStreak: Number(data.get('max_streak') ?? 0),
            rank: typeof data.get('rank') === 'number' ? data.get('rank') : null,
            isHidden: data.get('is_hidden') === true,
            badges: (data.get('badges') ?? []).map(Gamification.badgeOf)
        };
    }

    async badges(): Promise<Badge[]> {
        const response = await this.getTransport().send(METHOD_GAMIFICATION_BADGES, constants.HTTP_METHOD_GET, new Map());

        return (response.data ?? []).map(Gamification.badgeOf);
    }

    async leaderboard(period: LeaderboardPeriod = 'all', limit: number = 10): Promise<LeaderboardRow[]> {
        const response = await this.getTransport().send(METHOD_GAMIFICATION_LEADERBOARD, constants.HTTP_METHOD_GET, new Map<string, any>([
            ['period', period],
            ['limit', limit]
        ]));

        return (response.data ?? []).map((row: any) => ({
            rank: Number(Gamification.field(row, 'rank') ?? 0),
            userId: String(Gamification.field(row, 'user_id') ?? ''),
            name: Gamification.field(row, 'name') ?? '',
            points: Number(Gamification.field(row, 'points') ?? 0),
            streak: Number(Gamification.field(row, 'streak') ?? 0)
        }));
    }

    async history(limit: number = 50): Promise<PointsEvent[]> {
        const response = await this.getTransport().send(METHOD_GAMIFICATION_HISTORY, constants.HTTP_METHOD_GET, new Map<string, any>([
            ['limit', limit]
        ]));

        return (response.data ?? []).map((row: any) => ({
            event: Gamification.field(row, 'event') ?? '',
            points: Number(Gamification.field(row, 'points') ?? 0),
            subjectId: Gamification.field(row, 'subject_id') ?? null,
            subjectType: Gamification.field(row, 'subject_type') ?? null,
            createdAt: Gamification.field(row, 'created_at') ?? null
        }));
    }

    async setHidden(hidden: boolean): Promise<boolean> {
        const response = await this.getTransport().send(METHOD_GAMIFICATION_VISIBILITY, constants.HTTP_METHOD_POST, new Map<string, any>([
            ['hidden', hidden]
        ]));

        return response.data instanceof Map ? response.data.get('hidden') === true : hidden;
    }

    /** Items of a list come as Maps, nested ones as plain objects */
    private static field(row: any, key: string): any {
        return row instanceof Map ? row.get(key) : row[key];
    }

    private static badgeOf(row: any): Badge {
        const get = (key: string) => Gamification.field(row, key);

        return {
            id: String(get('id') ?? ''),
            title: get('title') ?? '',
            description: get('description') ?? '',
            iconId: get('icon_id') ?? null,
            condition: get('condition') ?? null,
            threshold: Number(get('threshold') ?? 0),
            progress: Number(get('progress') ?? 0),
            percent: Number(get('percent') ?? 0),
            isEarned: get('is_earned') === true,
            awardedAt: get('awarded_at') ?? null
        };
    }
}
