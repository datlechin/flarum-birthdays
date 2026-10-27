import app from 'flarum/forum/app';
import Page, { type IPageAttrs } from 'flarum/common/components/Page';
import PageStructure from 'flarum/forum/components/PageStructure';
import WelcomeHero from 'flarum/forum/components/WelcomeHero';
import IndexSidebar from 'flarum/forum/components/IndexSidebar';
import extractText from 'flarum/common/utils/extractText';
import type Mithril from 'mithril';
import BirthdayList from './BirthdayList';
import BirthdayListState from '../states/BirthdayListState';

export default class BirthdaysPage<CustomAttrs extends IPageAttrs = IPageAttrs> extends Page<CustomAttrs> {
  list!: BirthdayListState;

  oninit(vnode: Mithril.Vnode<CustomAttrs, this>) {
    super.oninit(vnode);

    this.list = new BirthdayListState();
    this.list.refresh();

    app.history.push('birthdays', extractText(app.translator.trans('datlechin-birthdays.forum.page.title')));
  }

  oncreate(vnode: Mithril.VnodeDOM<CustomAttrs, this>) {
    super.oncreate(vnode);

    app.setTitle(extractText(app.translator.trans('datlechin-birthdays.forum.page.title')));
    app.setTitleCount(0);
  }

  view() {
    return (
      <PageStructure className="BirthdaysPage" hero={() => <WelcomeHero />} sidebar={() => <IndexSidebar />}>
        <BirthdayList state={this.list} />
      </PageStructure>
    );
  }
}
