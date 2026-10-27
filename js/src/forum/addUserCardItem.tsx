import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import UserCard from 'flarum/forum/components/UserCard';
import Icon from 'flarum/common/components/Icon';
import type User from 'flarum/common/models/User';
import { formatBirthday } from '../common/utils/birthday';

export function birthdayText(user: User) {
  const monthDay = user.birthMonthDay();
  const age = user.age();

  if (monthDay && age !== undefined) {
    return app.translator.trans('datlechin-birthdays.forum.user_card.birthday_and_age_text', { date: formatBirthday(monthDay), age });
  }

  if (monthDay) {
    return app.translator.trans('datlechin-birthdays.forum.user_card.birthday_text', { date: formatBirthday(monthDay) });
  }

  if (age !== undefined) {
    return app.translator.trans('datlechin-birthdays.forum.user_card.age_text', { age });
  }

  return null;
}

export default function addUserCardItem() {
  extend(UserCard.prototype, 'infoItems', function (items) {
    // UserCard is still JavaScript, so its attrs are untyped.
    const text = birthdayText((this.attrs as { user: User }).user);

    if (!text) return;

    items.add(
      'birthday',
      <span className="UserCard-birthday">
        <Icon name="fas fa-cake-candles" /> {text}
      </span>,
      80
    );
  });
}
