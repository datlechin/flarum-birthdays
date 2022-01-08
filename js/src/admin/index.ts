import app from 'flarum/admin/app';

app.initializers.add('datlechin/flarum-birthdays', () => {
  app.extensionData.for('datlechin-birthdays').registerSetting({
    setting: 'datlechin-birthdays.set_on_registration',
    type: 'boolean',
    label: app.translator.trans('datlechin-birthdays.admin.settings.set_on_registration_label'),
  });
});
