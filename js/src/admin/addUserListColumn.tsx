import app from 'flarum/admin/app';
import { extend } from 'flarum/common/extend';
import UserListPage from 'flarum/admin/components/UserListPage';
import type User from 'flarum/common/models/User';

export default function addUserListColumn() {
  extend(UserListPage.prototype, 'columns', function (columns) {
    columns.add(
      'birthday',
      {
        name: app.translator.trans('datlechin-birthdays.admin.users.birthday_column'),
        content: (user: User) => {
          const birthday = user.birthday();

          return birthday
            ? app.translator.formatDateTime(dayjs(birthday), 'datlechin-birthdays.lib.datetime_formats.birthdayWithYear')
            : app.translator.trans('datlechin-birthdays.admin.users.no_birthday');
        },
      },
      75
    );
  });
}
