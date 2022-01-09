import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import User from 'flarum/common/models/User';
import Model from 'flarum/common/Model';
import SignUpModal from 'flarum/forum/components/SignUpModal';
import EditUserModal from 'flarum/common/components/EditUserModal';
import Button from 'flarum/common/components/Button';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import FieldSet from 'flarum/common/components/FieldSet';
import Switch from 'flarum/common/components/Switch';
import Stream from 'flarum/common/utils/Stream';
import UserCard from 'flarum/forum/components/UserCard';
import icon from 'flarum/common/helpers/icon';
import moment from 'moment';

import ChangeBirthdayModal from './components/ChangeBirthdayModal';
import calculateAge from './helpers/calculateAge';

app.initializers.add('datlechin/flarum-birthdays', () => {
  User.prototype.birthday = Model.attribute('birthday');
  User.prototype.showDobDate = Model.attribute('showDobDate');
  User.prototype.showDobYear = Model.attribute('showDobYear');
  User.prototype.canEditOwnBirthday = Model.attribute('canEditOwnBirthday');

  extend(UserCard.prototype, 'infoItems', function (items) {
    const user = this.attrs.user;
    const userLocale = user.preferences()?.locale || app.translator.formatter.locale;
    const dateFormat = app.forum.attribute('dateFormat') || 'DD MMMM YYYY';
    const dateNoneYearFormat = app.forum.attribute('dateNoneYearFormat') || 'DD MMMM';
    let birthday = user.birthday();
    const age = calculateAge(birthday);

    moment.locale(userLocale);

    if (birthday === null) return;

    if (user.showDobDate() && user.showDobYear()) birthday = moment(birthday).format(dateFormat);
    else if (user.showDobDate() === true && user.showDobYear() === false) birthday = moment(birthday).format(dateNoneYearFormat);
    else return;

    items.add(
      'birthday',
      <>
        {icon('fas fa-birthday-cake')}
        <span className="birthday">{app.translator.trans('datlechin-birthdays.forum.user.birthday_text', { date: birthday })}</span>
        {user.showDobYear() ? <span className="age">({app.translator.trans('datlechin-birthdays.forum.user.age_text', { age: age })})</span> : null}
      </>
    );
  });

  extend(EditUserModal.prototype, 'oninit', function () {
    this.birthday = Stream(this.attrs.user.birthday());
  });

  extend(EditUserModal.prototype, 'fields', function (items) {
    items.add(
      'birthday',
      <div className="Form-group">
        <label>{app.translator.trans('datlechin-birthdays.forum.edit_user.dob_heading')}</label>
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

  extend(SettingsPage.prototype, 'settingsItems', function (items) {
    if (this.user.canEditOwnBirthday()) {
      items.add(
        'birthday',
        <FieldSet className="Settings-birthday" label={app.translator.trans(`datlechin-birthdays.forum.settings.dob_heading`)}>
          <Switch
            state={this.user.showDobDate()}
            onchange={(value) => {
              this.showDobDateLoading = true;

              this.user.save({ showDobDate: value, showDobYear: value }).then(() => {
                this.showDobDateLoading = false;
                m.redraw();
              });
            }}
            loading={this.showDobDateLoading}
          >
            {app.translator.trans('datlechin-birthdays.forum.settings.show_dob_date_label')}
          </Switch>
          <Switch
            state={this.user.showDobDate() && this.user.showDobYear()}
            onchange={(value) => {
              this.showDobYearLoading = true;

              this.user.save({ showDobYear: value }).then(() => {
                this.showDobYearLoading = false;
                m.redraw();
              });
            }}
            loading={this.showDobYearLoading || this.showDobDateLoading}
          >
            {app.translator.trans('datlechin-birthdays.forum.settings.show_dob_year_label')}
          </Switch>
          <span className="helpText">{app.translator.trans('datlechin-birthdays.forum.settings.show_dob_year_help')}</span>
        </FieldSet>
      );
    }
  });

  extend(SettingsPage.prototype, 'accountItems', function (items) {
    if (this.user.canEditOwnBirthday()) {
      items.add(
        'changeBirthday',
        <Button className="Button" onclick={() => app.modal.show(ChangeBirthdayModal)}>
          {app.translator.trans('datlechin-birthdays.forum.settings.change_dob_label')}
        </Button>
      );
    }
  });
});
