import PaginatedListState, { type PaginatedListRequestParams } from 'flarum/common/states/PaginatedListState';
import type User from 'flarum/common/models/User';
export default class BirthdayListState extends PaginatedListState<User> {
    static UPCOMING_DAYS: number;
    constructor();
    get type(): string;
    protected requestParams(): PaginatedListRequestParams;
}
