import app from 'flarum/forum/app';
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import Avatar from 'flarum/common/components/Avatar';
import Button from 'flarum/common/components/Button';
import Link from 'flarum/common/components/Link';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import username from 'flarum/common/helpers/username';
import type User from 'flarum/common/models/User';
import type { Dayjs } from 'dayjs';
import type BirthdayListState from '../states/BirthdayListState';
import { nextBirthday } from '../../common/utils/birthday';

export interface IBirthdayListAttrs extends ComponentAttrs {
  state: BirthdayListState;
}

export default class BirthdayList extends Component<IBirthdayListAttrs> {
  view() {
    const state = this.attrs.state;

    if (state.isEmpty()) {
      return (
        <div className="BirthdayList">
          <Placeholder text={app.translator.trans('datlechin-birthdays.forum.page.empty_text')} />
        </div>
      );
    }

    const today = dayjs().startOf('day');
    const isLoading = state.isInitialLoading() || state.isLoadingNext();

    return (
      <div className="BirthdayList">
        <div className="BirthdayList-days">
          {this.days(today).map(([date, users]) => (
            <section key={date.format('YYYY-MM-DD')} className="BirthdayList-day">
              <h3 className="BirthdayList-date">{this.dateLabel(date, today)}</h3>
              <ul className="BirthdayList-users">
                {users.map((user) => (
                  <li key={user.id()}>{this.userItem(user, date.isSame(today, 'day'))}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="BirthdayList-loadMore">
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            state.hasNext() && (
              <Button className="Button" onclick={state.loadNext.bind(state)}>
                {app.translator.trans('datlechin-birthdays.forum.page.load_more_button')}
              </Button>
            )
          )}
        </div>
      </div>
    );
  }

  days(today: Dayjs): [Dayjs, User[]][] {
    const days = new Map<string, [Dayjs, User[]]>();

    this.attrs.state.getPages().forEach((page) =>
      page.items.forEach((user) => {
        const monthDay = user.birthMonthDay();

        if (!monthDay) return;

        const date = nextBirthday(monthDay, today);
        const key = date.format('YYYY-MM-DD');

        if (!days.has(key)) days.set(key, [date, []]);

        days.get(key)![1].push(user);
      })
    );

    return [...days.values()];
  }

  dateLabel(date: Dayjs, today: Dayjs) {
    if (date.isSame(today, 'day')) return app.translator.trans('datlechin-birthdays.forum.page.today_heading');
    if (date.isSame(today.add(1, 'day'), 'day')) return app.translator.trans('datlechin-birthdays.forum.page.tomorrow_heading');

    return app.translator.formatDateTime(date, 'datlechin-birthdays.lib.datetime_formats.day');
  }

  userItem(user: User, isToday: boolean) {
    const age = user.age();

    return (
      <Link href={app.route.user(user)} className="BirthdayList-user">
        <Avatar user={user} />
        <span className="BirthdayList-username">{username(user)}</span>
        {age !== undefined && (
          <span className="BirthdayList-age">
            {app.translator.trans('datlechin-birthdays.forum.page.turns_text', { age: isToday ? age : age + 1 })}
          </span>
        )}
      </Link>
    );
  }
}
