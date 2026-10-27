import bootstrapForum from '../bootstrap';
import { makeUser } from '../factory';
import { formatBirthday, isBirthdayToday, latestBirthday, nextBirthday } from '../../src/common/utils/birthday';

beforeAll(() => bootstrapForum());

describe('nextBirthday', () => {
  it('is today when the birthday is today', () => {
    expect(nextBirthday('06-05', dayjs('2026-06-05')).format('YYYY-MM-DD')).toBe('2026-06-05');
  });

  it('moves to next year once this one has passed', () => {
    expect(nextBirthday('01-01', dayjs('2026-12-31')).format('YYYY-MM-DD')).toBe('2027-01-01');
  });

  it('puts a leap day birthday on Feb 28 in other years', () => {
    expect(nextBirthday('02-29', dayjs('2026-02-01')).format('YYYY-MM-DD')).toBe('2026-02-28');
    expect(nextBirthday('02-29', dayjs('2028-02-01')).format('YYYY-MM-DD')).toBe('2028-02-29');
  });
});

describe('isBirthdayToday', () => {
  it('is false for someone who hides their birthday', () => {
    expect(isBirthdayToday(makeUser({ age: 30 }), dayjs())).toBe(false);
  });

  it('is true on the day', () => {
    expect(isBirthdayToday(makeUser({ birthMonthDay: '06-05' }), dayjs('2026-06-05'))).toBe(true);
    expect(isBirthdayToday(makeUser({ birthMonthDay: '06-05' }), dayjs('2026-06-06'))).toBe(false);
  });
});

it('formats a birthday without a year', () => {
  expect(formatBirthday('02-29')).toBe('February 29');
});

it('caps the date input at the minimum age', () => {
  expect(latestBirthday()).toBe(dayjs().subtract(13, 'year').format('YYYY-MM-DD'));
});
