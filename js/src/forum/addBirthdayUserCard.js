import { extend } from 'flarum/common/extend';
import UserCard from 'flarum/forum/components/UserCard';
import icon from 'flarum/common/helpers/icon';

export default function addBirthdayUserCard() {
  extend(UserCard.prototype, 'infoItems', function (items) {
    const user = this.attrs.user;
    const userLocale = user.preferences()?.locale || app.translator.formatter.locale;
    let birthday = user.birthday();
    let age;
    const date = new Date(birthday);
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };

    if (birthday === '0000-00-00' || birthday === '') return;

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
}
