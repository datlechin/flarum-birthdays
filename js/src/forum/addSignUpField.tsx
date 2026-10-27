import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import type SignUpModal from 'flarum/forum/components/SignUpModal';
import Stream from 'flarum/common/utils/Stream';
import BirthdayField from '../common/components/BirthdayField';

type SignUpMode = 'off' | 'optional' | 'required';

const signUpMode = () => app.forum.attribute<SignUpMode>('datlechin-birthdays.signUp') || 'off';

export default function addSignUpField() {
  extend<SignUpModal, 'oninit'>('flarum/forum/components/SignUpModal', 'oninit', function () {
    this.birthday = Stream('');
  });

  extend<SignUpModal, 'fields'>('flarum/forum/components/SignUpModal', 'fields', function (items) {
    const mode = signUpMode();

    if (mode === 'off') return;

    items.add('birthday', <BirthdayField stream={this.birthday} required={mode === 'required'} disabled={this.loading} />, 15);
  });

  extend<SignUpModal, 'submitData'>('flarum/forum/components/SignUpModal', 'submitData', function (data) {
    if (signUpMode() !== 'off' && this.birthday()) {
      Object.assign(data, { birthday: this.birthday() });
    }
  });
}
