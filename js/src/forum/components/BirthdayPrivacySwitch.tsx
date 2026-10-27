import Component, { type ComponentAttrs } from 'flarum/common/Component';
import Switch from 'flarum/common/components/Switch';
import type User from 'flarum/common/models/User';
import type Mithril from 'mithril';

export interface IBirthdayPrivacySwitchAttrs extends ComponentAttrs {
  user: User;
  attribute: 'showBirthday' | 'showAge';
}

export default class BirthdayPrivacySwitch extends Component<IBirthdayPrivacySwitchAttrs> {
  loading = false;

  view(vnode: Mithril.Vnode<IBirthdayPrivacySwitchAttrs, this>) {
    const { user, attribute } = this.attrs;

    return (
      <Switch state={!!user[attribute]()} loading={this.loading} onchange={this.save.bind(this)}>
        {vnode.children}
      </Switch>
    );
  }

  save(value: boolean) {
    this.loading = true;

    this.attrs.user.save({ [this.attrs.attribute]: value }).finally(() => {
      this.loading = false;
      m.redraw();
    });
  }
}
