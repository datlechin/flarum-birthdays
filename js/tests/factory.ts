import app from 'flarum/forum/app';
import type User from 'flarum/common/models/User';

let nextId = 100;

export function makeUser(attributes: Record<string, unknown> = {}): User {
  const id = String(nextId++);

  return app.store.pushPayload<User>({
    data: { type: 'users', id, attributes: { username: `user${id}`, displayName: `user${id}`, ...attributes } },
  } as any) as unknown as User;
}
