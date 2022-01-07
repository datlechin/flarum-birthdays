import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import SignUpModal from 'flarum/forum/components/SignUpModal';
import Stream from 'flarum/common/utils/Stream';

export default function addBirthdaySignUpModal() {
  extend(SignUpModal.prototype, 'oninit', function () {
    if (app.forum.attribute('setBirthdayOnRegistration')) {
      this.birthday = Stream(this.attrs.birthday || '');
    }
  });

  extend(SignUpModal.prototype, 'fields', function (items) {
    if (app.forum.attribute('setBirthdayOnRegistration')) {
      items.add(
        'birthday',
        <div className="Form-group">
          <input className="FormControl birthday" name="birthday" type="date" bidi={this.birthday} disabled={this.loading} />
        </div>,
        20
      );
    }
  });

  extend(SignUpModal.prototype, 'submitData', function (data) {
    if (app.forum.attribute('setBirthdayOnRegistration')) {
      data.birthday = this.birthday();
    }
  });
}
