import FormModal, { type IFormModalAttrs } from 'flarum/common/components/FormModal';
import Stream from 'flarum/common/utils/Stream';
import type User from 'flarum/common/models/User';
import type Mithril from 'mithril';
export interface IChangeBirthdayModalAttrs extends IFormModalAttrs {
    user: User;
}
export default class ChangeBirthdayModal<CustomAttrs extends IChangeBirthdayModalAttrs = IChangeBirthdayModalAttrs> extends FormModal<CustomAttrs> {
    birthday: Stream<string>;
    oninit(vnode: Mithril.Vnode<CustomAttrs, this>): void;
    className(): string;
    title(): string | any[];
    content(): JSX.Element;
    onsubmit(e: SubmitEvent): void;
}
