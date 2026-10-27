import app from 'flarum/forum/app';
import addEditUserField from '../common/addEditUserField';
import addBirthdayBadge from './addBirthdayBadge';
import addNotificationType from './addNotificationType';
import addSettings from './addSettings';
import addSidebarLink from './addSidebarLink';
import addSignUpField from './addSignUpField';
import addUserCardItem from './addUserCardItem';

export { default as extend } from './extend';

app.initializers.add('datlechin-birthdays', () => {
  addUserCardItem();
  addBirthdayBadge();
  addSidebarLink();
  addSignUpField();
  addSettings();
  addNotificationType();
  addEditUserField();
});
