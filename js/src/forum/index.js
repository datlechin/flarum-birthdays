import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import User from 'flarum/common/models/User';
import Model from 'flarum/common/Model';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import UserCard from 'flarum/forum/components/UserCard';
import SessionDropdown from 'flarum/forum/components/SessionDropdown';
import Button from 'flarum/common/components/Button';
import icon from 'flarum/common/helpers/icon';
import ChangeBirthdayModal from './components/ChangeBirthdayModal';

app.initializers.add('datlechin/flarum-birthdays', () => {
  User.prototype.birthday = Model.attribute('birthday');
  extend(SettingsPage.prototype, 'accountItems', function (items) {
    items.add(
      'changeBirthday',
      <Button className="Button" onclick={() => app.modal.show(ChangeBirthdayModal)}>
        {app.translator.trans('datlechin-birthdays.forum.change_birthday.title')}
      </Button>
    );
  });
  extend(UserCard.prototype, 'infoItems', function (items) {
    const user = this.attrs.user;
    if (user.birthday() === '0000-00-00') return;

    items.add(
      'birthday',
      <>
        {icon('fas fa-birthday-cake')}
        {app.translator.trans('datlechin-birthdays.forum.user.birthday_text', { date: user.birthday() })}
      </>
    );
  });
  extend(SessionDropdown.prototype, 'items', function (items) {
    console.log(items);
    items.add(
      'birthday',
      <Button icon="fas fa-birthday-cake" onclick={() => app.modal.show(ChangeBirthdayModal)}>
        {app.translator.trans('datlechin-birthdays.forum.header.edit_birthday_button')}
      </Button>
    );
  });
});
