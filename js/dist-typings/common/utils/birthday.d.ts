import type User from 'flarum/common/models/User';
import type { Dayjs } from 'dayjs';
export declare function nextBirthday(monthDay: string, today?: Dayjs): Dayjs;
export declare function isBirthdayToday(user: User, today?: Dayjs): boolean;
export declare function formatBirthday(monthDay: string): string;
export declare function latestBirthday(): string;
