import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import EditUserModal from 'flarum/common/components/EditUserModal';
import Stream from 'flarum/common/utils/Stream';
import extractText from 'flarum/utils/extractText';

export default function addBirthdayEditUserModal() {
  extend(EditUserModal.prototype, 'oninit', function () {
    this.birthday = Stream(this.attrs.user.birthday());
  });

  extend(EditUserModal.prototype, 'fields', function (items) {
    items.add(
      'birthday',
      <div className="Form-group">
        <label>{app.translator.trans('datlechin-birthdays.forum.edit_user.birthdays_heading')}</label>
        <input className="FormControl" type="date" bidi={this.birthday} />
      </div>,
      30
    );
  });

  extend(EditUserModal.prototype, 'data', function (data) {
    if (this.birthday() !== this.attrs.user.birthday()) {
      data.birthday = this.birthday();
    }
  });
}
