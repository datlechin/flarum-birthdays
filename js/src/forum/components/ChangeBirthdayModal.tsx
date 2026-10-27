import app from 'flarum/forum/app';
import FormModal, { type IFormModalAttrs } from 'flarum/common/components/FormModal';
import Form from 'flarum/common/components/Form';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
import type User from 'flarum/common/models/User';
import type Mithril from 'mithril';
import BirthdayField from '../../common/components/BirthdayField';

export interface IChangeBirthdayModalAttrs extends IFormModalAttrs {
  user: User;
}

export default class ChangeBirthdayModal<CustomAttrs extends IChangeBirthdayModalAttrs = IChangeBirthdayModalAttrs> extends FormModal<CustomAttrs> {
  birthday!: Stream<string>;

  oninit(vnode: Mithril.Vnode<CustomAttrs, this>) {
    super.oninit(vnode);

    this.birthday = Stream(this.attrs.user.birthday() || '');
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
        <Form className="Form--centered">
          <BirthdayField stream={this.birthday} disabled={this.loading} />
          <div className="Form-group Form-controls">
            <Button className="Button Button--primary Button--block" type="submit" loading={this.loading}>
              {app.translator.trans('datlechin-birthdays.forum.change_birthday.submit_button')}
            </Button>
          </div>
        </Form>
      </div>
    );
  }

  onsubmit(e: SubmitEvent) {
    e.preventDefault();

    const birthday = this.birthday() || null;

    if (birthday === (this.attrs.user.birthday() ?? null)) {
      this.hide();
      return;
    }

    this.loading = true;
    this.alertAttrs = null;

    this.attrs.user.save({ birthday }, { errorHandler: this.onerror.bind(this) }).then(() => this.hide(), this.loaded.bind(this));
  }
}
