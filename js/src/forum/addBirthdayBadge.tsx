import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import User from 'flarum/common/models/User';
import Badge from 'flarum/common/components/Badge';
import { isBirthdayToday } from '../common/utils/birthday';

export default function addBirthdayBadge() {
  extend(User.prototype, 'badges', function (items) {
    if (!isBirthdayToday(this)) return;

    items.add(
      'birthday',
      <Badge type="birthday" icon="fas fa-cake-candles" label={app.translator.trans('datlechin-birthdays.forum.badge.birthday_tooltip', {}, true)} />,
      50
    );
  });
}
