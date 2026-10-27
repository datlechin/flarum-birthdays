import Component, { type ComponentAttrs } from 'flarum/common/Component';
import type User from 'flarum/common/models/User';
import type { Dayjs } from 'dayjs';
import type BirthdayListState from '../states/BirthdayListState';
export interface IBirthdayListAttrs extends ComponentAttrs {
    state: BirthdayListState;
}
export default class BirthdayList extends Component<IBirthdayListAttrs> {
    view(): JSX.Element;
    days(today: Dayjs): [Dayjs, User[]][];
    dateLabel(date: Dayjs, today: Dayjs): string | any[];
    userItem(user: User, isToday: boolean): JSX.Element;
}
