import fs from 'fs';
import path from 'path';
import jsYaml from 'js-yaml';
import flatten from 'flat';

import app from 'flarum/forum/app';
import ForumApplication from 'flarum/forum/ForumApplication';
import Drawer from 'flarum/common/utils/Drawer';

// The index registers the initializer as a side effect, so boot() runs it.
import { extend as extenders } from '../src/forum';

let booted = false;

export default function bootstrapForum(): void {
  if (booted) return;

  (ForumApplication.prototype as any).mount = () => {};

  app.load({
    apiDocument: null,
    locale: 'en',
    locales: {},
    resources: [
      {
        type: 'forums',
        id: '1',
        attributes: {
          apiUrl: 'https://example.com/api',
          baseUrl: 'https://example.com',
          basePath: '',
          title: 'Example',
          'datlechin-birthdays.minAge': 13,
          'datlechin-birthdays.signUp': 'optional',
        },
      },
    ],
    session: { userId: 0, csrfToken: 'test' },
  } as any);

  extenders.forEach((extender: any) => extender.extend(app, { id: 'datlechin-birthdays', extra: {} }));
  app.boot();

  app.translator.setLocale('en');
  app.translator.addTranslations(readTranslations('../vendor/flarum/core/locale/core.yml'));
  app.translator.addTranslations(readTranslations('../locale/en.yml'));
  (app as any).drawer = new Drawer();

  // mount() is what clears Mithril's default `#!` prefix, and the test app never mounts.
  m.route.prefix = '';

  booted = true;
}

function readTranslations(relative: string): Record<string, string> {
  return flatten(jsYaml.load(fs.readFileSync(path.resolve(process.cwd(), relative), 'utf8')) as object) as Record<string, string>;
}
