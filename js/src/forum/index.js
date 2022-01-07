import app from 'flarum/forum/app';
import User from 'flarum/common/models/User';
import Model from 'flarum/common/Model';
import addBirthdayUserCard from './components/addBirthdayUserCard';
import addChangeBirthdaySettingsPage from './components/addChangeBirthdaySettingsPage';
import addBirthdaySessionDrodpown from './components/addBirthdaySessionDropdown';

app.initializers.add('datlechin/flarum-birthdays', () => {
  User.prototype.birthday = Model.attribute('birthday');
  User.prototype.showDobDate = Model.attribute('showDobDate');
  User.prototype.showDobYear = Model.attribute('showDobYear');

  addBirthdayUserCard();
  addChangeBirthdaySettingsPage();
  addBirthdaySessionDrodpown();
});
