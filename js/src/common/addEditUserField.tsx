import { extend } from 'flarum/common/extend';
import type EditUserModal from 'flarum/common/components/EditUserModal';
import Stream from 'flarum/common/utils/Stream';
import BirthdayField from './components/BirthdayField';

export default function addEditUserField() {
  extend<EditUserModal, 'oninit'>('flarum/common/components/EditUserModal', 'oninit', function () {
    this.birthday = Stream(this.attrs.user.birthday() || '');
  });

  extend<EditUserModal, 'fields'>('flarum/common/components/EditUserModal', 'fields', function (items) {
    if (!this.attrs.user.canEditBirthday()) return;

    items.add('birthday', <BirthdayField stream={this.birthday} disabled={this.loading} />, 25);
  });

  extend<EditUserModal, 'data'>('flarum/common/components/EditUserModal', 'data', function (data) {
    if (!this.attrs.user.canEditBirthday()) return;

    const birthday = this.birthday() || null;

    if (birthday !== (this.attrs.user.birthday() ?? null)) {
      data.birthday = birthday;
    }
  });
}
