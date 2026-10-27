import app from 'flarum/forum/app';
import Notification from 'flarum/forum/components/Notification';
import type User from 'flarum/common/models/User';

export default class BirthdayNotification extends Notification {
  icon() {
    return 'fas fa-cake-candles';
  }

  href() {
    return app.route.user(this.attrs.notification.subject() as User);
  }

  content() {
    return app.translator.trans('datlechin-birthdays.forum.notifications.birthday_text', { forum: app.forum.attribute('title') });
  }

  excerpt() {
    return null;
  }
}
