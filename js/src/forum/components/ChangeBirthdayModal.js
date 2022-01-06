import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Switch from 'flarum/common/components/Switch';
import Stream from 'flarum/common/utils/Stream';

export default class ChangeBirthdayModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    const user = app.session.user;

    this.birthday = Stream(user.birthday());
    this.showDobDate = Stream(user.showDobDate());
    this.showDobYear = Stream(user.showDobYear());
  }

  className() {
    return 'ChangeBirthdayModal Modal--small';
  }

  title() {
    return app.translator.trans('datlechin-birthdays.forum.change_dob.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('datlechin-birthdays.forum.change_dob.date_of_birth_text')}</label>
            <input type="date" name="birthday" className="FormControl" bidi={this.birthday} disabled={this.loading} />
          </div>
          <div className="Form-group">
            {Switch.component(
              {
                state: this.showDobDate(),
                onchange: this.showDobDate,
              },
              app.translator.trans('datlechin-birthdays.forum.change_dob.show_dob_date')
            )}
          </div>
          <div className="Form-group">
            {Switch.component(
              {
                state: this.showDobDate() && this.showDobYear(),
                onchange: this.showDobYear,
              },
              app.translator.trans('datlechin-birthdays.forum.change_dob.show_dob_year')
            )}
            <div className="helpText">{app.translator.trans('datlechin-birthdays.forum.change_dob.show_dob_year_help')}</div>
          </div>
          <div className="Form-group">
            {Button.component(
              {
                className: 'Button Button--primary',
                type: 'submit',
                loading: this.loading,
              },
              app.translator.trans('datlechin-birthdays.forum.change_dob.submit_button')
            )}
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    // If the user hasn't actually entered a different email address, we don't
    // need to do anything. Woot!
    if (
      this.birthday() === app.session.user.birthday() &&
      this.showDobDate() === app.session.user.showDobDate() &&
      this.showDobYear() === app.session.user.showDobYear()
    ) {
      this.hide();
      return;
    }

    this.loading = true;
    this.alertAttrs = null;

    app.session.user
      .save(
        {
          birthday: this.birthday(),
          showDobDate: this.showDobDate(),
          showDobYear: this.showDobYear(),
        },
        {
          errorHandler: this.onerror.bind(this),
        }
      )
      .then(() => {
        this.success = true;
        this.hide();
      })
      .catch(() => {})
      .then(this.loaded.bind(this));
  }

  onerror(error) {
    super.onerror(error);
  }
}
