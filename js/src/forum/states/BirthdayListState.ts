import PaginatedListState, { type PaginatedListRequestParams } from 'flarum/common/states/PaginatedListState';
import type User from 'flarum/common/models/User';

export default class BirthdayListState extends PaginatedListState<User> {
  static UPCOMING_DAYS = 7;

  constructor() {
    super({});
  }

  get type(): string {
    return 'users';
  }

  protected requestParams(): PaginatedListRequestParams {
    const today = dayjs();
    const until = today.add(BirthdayListState.UPCOMING_DAYS, 'day');

    return {
      filter: { birthday: `${today.format('YYYY-MM-DD')}..${until.format('YYYY-MM-DD')}` },
    };
  }
}
