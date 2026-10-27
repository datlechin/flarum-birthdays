import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import type SettingsPage from 'flarum/forum/components/SettingsPage';
import Button from 'flarum/common/components/Button';
import ChangeBirthdayModal from './components/ChangeBirthdayModal';
import BirthdayPrivacySwitch from './components/BirthdayPrivacySwitch';

// SettingsPage is a lazy chunk, so it is extended by module path.
export default function addSettings() {
  extend<SettingsPage, 'accountItems'>('flarum/forum/components/SettingsPage', 'accountItems', function (items) {
    const user = this.user!;

    if (!user.canEditBirthday()) return;

    items.add(
      'changeBirthday',
      <Button className="Button" onclick={() => app.modal.show(ChangeBirthdayModal, { user })}>
        {user.birthday()
          ? app.translator.trans('datlechin-birthdays.forum.settings.change_birthday_button')
          : app.translator.trans('datlechin-birthdays.forum.settings.add_birthday_button')}
      </Button>,
      80
    );
  });

  extend<SettingsPage, 'privacyItems'>('flarum/forum/components/SettingsPage', 'privacyItems', function (items) {
    const user = this.user!;

    if (!user.canEditBirthday() || !user.birthday()) return;

    items.add(
      'showBirthday',
      <BirthdayPrivacySwitch user={user} attribute="showBirthday">
        {app.translator.trans('datlechin-birthdays.forum.settings.show_birthday_label')}
      </BirthdayPrivacySwitch>,
      90
    );

    items.add(
      'showAge',
      <BirthdayPrivacySwitch user={user} attribute="showAge">
        {app.translator.trans('datlechin-birthdays.forum.settings.show_age_label')}
      </BirthdayPrivacySwitch>,
      80
    );
  });
}
