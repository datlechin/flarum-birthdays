import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';

export default class ChangeBirthdayModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.birthday = Stream(app.session.user.birthday());
  }

  className() {
    return 'ChangeBirthdayModal Modal--small';
  }

  title() {
    return app.translator.trans('datlechin-birthdays.forum.change_birthday.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form Form--centered">
          <div className="Form-group">
            <input
              type="date"
              name="birthday"
              className="FormControl"
              bidi={this.birthday}
              disabled={this.loading}
            />
          </div>
          <div className="Form-group">
            {Button.component(
              {
                className: 'Button Button--primary Button--block',
                type: 'submit',
                loading: this.loading,
              },
              app.translator.trans('datlechin-birthdays.forum.change_birthday.submit_button')
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
    if (this.birthday() === app.session.user.email()) {
      this.hide();
      return;
    }

    this.loading = true;
    this.alertAttrs = null;

    app.session.user
      .save(
        { birthday: this.birthday() },
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
    if (error.status === 401) {
      error.alert.content = app.translator.trans('core.forum.change_email.incorrect_password_message');
    }

    super.onerror(error);
  }
}
