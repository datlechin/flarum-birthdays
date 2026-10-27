import app from 'flarum/common/app';
import type User from 'flarum/common/models/User';
import type { Dayjs } from 'dayjs';

// The date a MM-DD birthday next falls on, today included. Feb 29 falls on Feb 28 in other years.
export function nextBirthday(monthDay: string, today: Dayjs = dayjs()): Dayjs {
  const start = today.startOf('day');

  const inYear = (year: number) => {
    const date = dayjs(`${year}-${monthDay}`);

    return date.format('MM-DD') === monthDay ? date : dayjs(`${year}-02-28`);
  };

  const thisYear = inYear(start.year());

  return thisYear.isBefore(start) ? inYear(start.year() + 1) : thisYear;
}

export function isBirthdayToday(user: User, today: Dayjs = dayjs()): boolean {
  const monthDay = user.birthMonthDay();

  return !!monthDay && nextBirthday(monthDay, today).isSame(today, 'day');
}

export function formatBirthday(monthDay: string): string {
  // 2000 is a leap year, so Feb 29 formats as itself.
  return app.translator.formatDateTime(dayjs(`2000-${monthDay}`), 'datlechin-birthdays.lib.datetime_formats.birthday');
}

export function latestBirthday(): string {
  return dayjs()
    .subtract(app.forum.attribute<number>('datlechin-birthdays.minAge') || 0, 'year')
    .format('YYYY-MM-DD');
}
