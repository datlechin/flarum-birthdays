import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import Button from 'flarum/common/components/Button';
import ChangeBirthdayModal from './components/ChangeBirthdayModal';

export default function addChangeBirthdaySettingsPage() {
  extend(SettingsPage.prototype, 'accountItems', function (items) {
    items.add(
      'changeBirthday',
      <Button className="Button" onclick={() => app.modal.show(ChangeBirthdayModal)}>
        {app.translator.trans('datlechin-birthdays.forum.change_dob.title')}
      </Button>
    );
  });
}
