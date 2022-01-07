import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import SessionDropdown from 'flarum/forum/components/SessionDropdown';
import ChangeBirthdayModal from './ChangeBirthdayModal';

export default function addBirthdaySessionDrodpown() {
  extend(SessionDropdown.prototype, 'items', function (items) {
    items.add(
      'birthday',
      <Button icon="fas fa-birthday-cake" onclick={() => app.modal.show(ChangeBirthdayModal)}>
        {app.translator.trans('datlechin-birthdays.forum.header.edit_dob_button')}
      </Button>
    );
  });
}
