import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import SettingsPage from 'flarum/common/components/SettingsPage';
import FieldSet from 'flarum/common/components/FieldSet';
import Switch from 'flarum/common/components/Switch';

export default function addBirthdaySettings() {
  extend(SettingsPage.prototype, 'settingsItems', function (items) {
    items.add(
      'birthday',
      <FieldSet className="Settings-birthday" label={app.translator.trans(`datlechin-birthdays.forum.settings.birthday_heading`)}>
        <Switch
          state={this.user.showDobDate()}
          onchange={(value) => {
            this.showDobDateLoading = true;

            this.user.save({ showDobDate: value }).then(() => {
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
          loading={this.showDobYearLoading}
        >
          {app.translator.trans('datlechin-birthdays.forum.settings.show_dob_year_label')}
        </Switch>
        <span className="helpText">{app.translator.trans('datlechin-birthdays.forum.settings.show_dob_year_help')}</span>
      </FieldSet>
    );
  });
}
