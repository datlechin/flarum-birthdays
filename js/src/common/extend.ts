import Extend from 'flarum/common/extenders';
import User from 'flarum/common/models/User';

export default [
  new Extend.Model(User)
    .attribute<string | null>('birthday')
    .attribute<string>('birthMonthDay')
    .attribute<number>('age')
    .attribute<boolean>('showBirthday')
    .attribute<boolean>('showAge')
    .attribute<boolean>('canEditBirthday'),
];
