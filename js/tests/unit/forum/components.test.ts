import mq from 'mithril-query';
import bootstrapForum from '../../bootstrap';
import { makeUser } from '../../factory';
import ChangeBirthdayModal from '../../../src/forum/components/ChangeBirthdayModal';
import BirthdayList from '../../../src/forum/components/BirthdayList';
import BirthdayListState from '../../../src/forum/states/BirthdayListState';
import { birthdayText } from '../../../src/forum/addUserCardItem';
import extractText from 'flarum/common/utils/extractText';

beforeAll(() => bootstrapForum());

describe('ChangeBirthdayModal', () => {
  it('wraps the field in a form, so Save submits', () => {
    const out = mq(ChangeBirthdayModal, { user: makeUser({ birthday: '1990-06-05' }), animateShow: () => {}, state: {} });

    const forms = out.rootEl.querySelectorAll('form');
    const input = out.rootEl.querySelector('form input[name=birthday]') as HTMLInputElement;

    expect(forms).toHaveLength(1);
    expect(input.type).toBe('date');
    expect(input.value).toBe('1990-06-05');
    expect(out.rootEl.querySelector('form button[type=submit]')).not.toBeNull();
  });
});

describe('profile text', () => {
  it('says only what the member shares', () => {
    expect(extractText(birthdayText(makeUser({ birthMonthDay: '06-05' })))).toBe('Birthday June 5');
    expect(extractText(birthdayText(makeUser({ age: 35 })))).toBe('Age 35');
    expect(extractText(birthdayText(makeUser({ birthMonthDay: '06-05', age: 35 })))).toBe('Birthday June 5, age 35');
    expect(birthdayText(makeUser({}))).toBeNull();
  });
});

describe('birthday badge', () => {
  it('shows only on the day', () => {
    const today = dayjs().format('MM-DD');
    const tomorrow = dayjs().add(1, 'day').format('MM-DD');

    expect(makeUser({ birthMonthDay: today }).badges().has('birthday')).toBe(true);
    expect(makeUser({ birthMonthDay: tomorrow }).badges().has('birthday')).toBe(false);
  });
});

describe('BirthdayList', () => {
  it('groups members by the day they celebrate, soonest first', () => {
    const state = new BirthdayListState();

    (state as any).pages = [
      {
        number: 1,
        items: [
          makeUser({ username: 'today', displayName: 'today', birthMonthDay: dayjs().format('MM-DD'), age: 30 }),
          makeUser({ username: 'later', displayName: 'later', birthMonthDay: dayjs().add(3, 'day').format('MM-DD'), age: 40 }),
        ],
      },
    ];

    const out = mq(BirthdayList, { state });

    const headings = [...out.rootEl.querySelectorAll('.BirthdayList-date')].map((el) => el.textContent);
    const ages = [...out.rootEl.querySelectorAll('.BirthdayList-age')].map((el) => el.textContent);

    expect(headings).toEqual(['Today', dayjs().add(3, 'day').format('dddd, MMMM D')]);
    expect(ages).toEqual(['Turns 30', 'Turns 41']);
  });

  it('says so when nobody celebrates this week', () => {
    const out = mq(BirthdayList, { state: new BirthdayListState() });

    expect(out.rootEl.textContent).toContain('No birthdays in the next week.');
  });
});
