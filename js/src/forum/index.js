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
  User.prototype.showDobDate = Model.attribute('showDobDate');
  User.prototype.showDobYear = Model.attribute('showDobYear');
  extend(SettingsPage.prototype, 'accountItems', function (items) {
    items.add(
      'changeBirthday',
      <Button className="Button" onclick={() => app.modal.show(ChangeBirthdayModal)}>
        {app.translator.trans('datlechin-birthdays.forum.change_dob.title')}
      </Button>
    );
  });
  extend(UserCard.prototype, 'infoItems', function (items) {
    const user = this.attrs.user;
    const userLocale = user.preferences()?.locale || 'en';
    let birthday = user.birthday();
    let age;
    const date = new Date(birthday);
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };

    if (birthday === '0000-00-00') return;

    if (user.showDobDate() && user.showDobYear()) {
      age = new Date().getFullYear() - new Date(birthday).getFullYear();
      birthday = date.toLocaleDateString(userLocale, options);
    } else if (user.showDobDate() === true && user.showDobYear() === false) {
      birthday = date.toLocaleDateString(userLocale, options);
      birthday = birthday.split(',')[0];
    } else {
      return;
    }

    items.add(
      'birthday',
      <>
        {icon('fas fa-birthday-cake')}
        <span className="birthday">{app.translator.trans('datlechin-birthdays.forum.user.birthday_text', { date: birthday })}</span>
        {user.showDobYear() ? <span className="age">({app.translator.trans('datlechin-birthdays.forum.user.age_text', { age: age })})</span> : null}
      </>
    );
  });
  extend(SessionDropdown.prototype, 'items', function (items) {
    items.add(
      'birthday',
      <Button icon="fas fa-birthday-cake" onclick={() => app.modal.show(ChangeBirthdayModal)}>
        {app.translator.trans('datlechin-birthdays.forum.header.edit_dob_button')}
      </Button>
    );
  });
});
