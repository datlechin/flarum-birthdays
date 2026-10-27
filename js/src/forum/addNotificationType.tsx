import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import type NotificationGrid from 'flarum/forum/components/NotificationGrid';

export default function addNotificationType() {
  extend<NotificationGrid, 'notificationTypes'>('flarum/forum/components/NotificationGrid', 'notificationTypes', function (items) {
    items.add('birthday', {
      name: 'birthday',
      icon: 'fas fa-cake-candles',
      label: app.translator.trans('datlechin-birthdays.forum.settings.notify_birthday_label'),
    });
  });
}
