import Extend from 'flarum/common/extenders';
import commonExtend from '../common/extend';
import BirthdaysPage from './components/BirthdaysPage';
import BirthdayNotification from './components/BirthdayNotification';

export default [
  ...commonExtend,

  new Extend.Routes().add('birthdays', '/birthdays', BirthdaysPage),

  new Extend.Notification().add('birthday', BirthdayNotification),
];
