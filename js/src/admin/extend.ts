import app from 'flarum/admin/app';
import Extend from 'flarum/common/extenders';
import commonExtend from '../common/extend';

export default [
  ...commonExtend,

  new Extend.Admin()
    .setting(() => ({
      setting: 'datlechin-birthdays.sign_up',
      type: 'select',
      label: app.translator.trans('datlechin-birthdays.admin.settings.sign_up_label'),
      help: app.translator.trans('datlechin-birthdays.admin.settings.sign_up_help'),
      options: {
        off: app.translator.trans('datlechin-birthdays.admin.settings.sign_up_options.off'),
        optional: app.translator.trans('datlechin-birthdays.admin.settings.sign_up_options.optional'),
        required: app.translator.trans('datlechin-birthdays.admin.settings.sign_up_options.required'),
      },
      default: 'off',
    }))
    .setting(() => ({
      setting: 'datlechin-birthdays.min_age',
      type: 'number',
      min: 0,
      label: app.translator.trans('datlechin-birthdays.admin.settings.min_age_label'),
      help: app.translator.trans('datlechin-birthdays.admin.settings.min_age_help'),
    }))
    .permission(
      () => ({
        permission: 'user.viewBirthday',
        icon: 'fas fa-cake-candles',
        label: app.translator.trans('datlechin-birthdays.admin.permissions.view_birthday_label'),
        allowGuest: true,
      }),
      'view'
    )
    .permission(
      () => ({
        permission: 'user.editOwnBirthday',
        icon: 'fas fa-cake-candles',
        label: app.translator.trans('datlechin-birthdays.admin.permissions.edit_own_birthday_label'),
      }),
      'start'
    ),
];
