import Extend from 'flarum/common/extenders';
import app from 'flarum/admin/app';

export default [
  new Extend.Admin()
    .setting(() => ({
      setting: 'datlechin-birthdays.set_on_registration',
      type: 'boolean',
      label: app.translator.trans('datlechin-birthdays.admin.settings.set_on_registration_label'),
    }))
    .setting(() => ({
      setting: 'datlechin-birthdays.required',
      type: 'boolean',
      label: app.translator.trans('datlechin-birthdays.admin.settings.required_label'),
      help: app.translator.trans('datlechin-birthdays.admin.settings.required_help'),
    }))
    .setting(() => ({
      setting: 'datlechin-birthdays.min_age',
      type: 'number',
      label: app.translator.trans('datlechin-birthdays.admin.settings.min_age_label'),
      help: app.translator.trans('datlechin-birthdays.admin.settings.min_age_help'),
    }))
    .setting(() => ({
      setting: 'datlechin-birthdays.date_format',
      type: 'text',
      label: app.translator.trans('datlechin-birthdays.admin.settings.date_format_label'),
      placeholder: 'LL',
    }))
    .setting(() => ({
      setting: 'datlechin-birthdays.date_none_year_format',
      type: 'text',
      label: app.translator.trans('datlechin-birthdays.admin.settings.date_none_year_label'),
      placeholder: 'DD MMMM',
    }))
    .customSetting(() => (
      <div className="Form-group">
        <p className="helpText">
          {app.translator.trans('datlechin-birthdays.admin.settings.date_format_help', {
            a: <a href="https://day.js.org/docs/en/display/format" target="_blank" />,
          })}
        </p>
      </div>
    ))
    .permission(
      () => ({
        permission: 'user.editOwnBirthday',
        icon: 'fas fa-user-tag',
        label: app.translator.trans('datlechin-birthdays.admin.permissions.edit_own_birthday_label'),
      }),
      'start'
    )
    .permission(
      () => ({
        permission: 'user.viewBirthday',
        icon: 'fas fa-eye',
        label: app.translator.trans('datlechin-birthdays.admin.permissions.view_birthday_label'),
        allowGuest: true,
      }),
      'view'
    ),
];
