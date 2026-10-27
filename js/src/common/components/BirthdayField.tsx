import app from 'flarum/common/app';
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import FormGroup from 'flarum/common/components/FormGroup';
import type Stream from 'flarum/common/utils/Stream';
import { latestBirthday } from '../utils/birthday';

export interface IBirthdayFieldAttrs extends ComponentAttrs {
  stream: Stream<string>;
  required?: boolean;
  disabled?: boolean;
}

export default class BirthdayField extends Component<IBirthdayFieldAttrs> {
  view() {
    return (
      <FormGroup
        type="date"
        name="birthday"
        label={app.translator.trans('datlechin-birthdays.lib.birthday_label')}
        max={latestBirthday()}
        {...this.attrs}
      />
    );
  }
}
