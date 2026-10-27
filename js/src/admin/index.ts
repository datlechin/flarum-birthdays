import app from 'flarum/admin/app';
import addEditUserField from '../common/addEditUserField';
import addUserListColumn from './addUserListColumn';

export { default as extend } from './extend';

app.initializers.add('datlechin-birthdays', () => {
  addEditUserField();
  addUserListColumn();
});
