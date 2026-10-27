import Page, { type IPageAttrs } from 'flarum/common/components/Page';
import type Mithril from 'mithril';
import BirthdayListState from '../states/BirthdayListState';
export default class BirthdaysPage<CustomAttrs extends IPageAttrs = IPageAttrs> extends Page<CustomAttrs> {
    list: BirthdayListState;
    oninit(vnode: Mithril.Vnode<CustomAttrs, this>): void;
    oncreate(vnode: Mithril.VnodeDOM<CustomAttrs, this>): void;
    view(): JSX.Element;
}
