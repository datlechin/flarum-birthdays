import Component, { type ComponentAttrs } from 'flarum/common/Component';
import type User from 'flarum/common/models/User';
import type Mithril from 'mithril';
export interface IBirthdayPrivacySwitchAttrs extends ComponentAttrs {
    user: User;
    attribute: 'showBirthday' | 'showAge';
}
export default class BirthdayPrivacySwitch extends Component<IBirthdayPrivacySwitchAttrs> {
    loading: boolean;
    view(vnode: Mithril.Vnode<IBirthdayPrivacySwitchAttrs, this>): JSX.Element;
    save(value: boolean): void;
}
