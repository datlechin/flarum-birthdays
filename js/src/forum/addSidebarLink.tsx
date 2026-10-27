import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexSidebar from 'flarum/forum/components/IndexSidebar';
import LinkButton from 'flarum/common/components/LinkButton';

export default function addSidebarLink() {
  extend(IndexSidebar.prototype, 'navItems', function (items) {
    // The page lists users, so it needs both permissions.
    if (!app.forum.attribute('canViewBirthdays') || !app.forum.attribute('canSearchUsers')) return;

    items.add(
      'birthdays',
      <LinkButton href={app.route('birthdays')} icon="fas fa-cake-candles">
        {app.translator.trans('datlechin-birthdays.forum.nav.birthdays_link')}
      </LinkButton>
    );
  });
}
