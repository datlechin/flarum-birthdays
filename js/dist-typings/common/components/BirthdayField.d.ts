import Component, { type ComponentAttrs } from 'flarum/common/Component';
import type Stream from 'flarum/common/utils/Stream';
export interface IBirthdayFieldAttrs extends ComponentAttrs {
    stream: Stream<string>;
    required?: boolean;
    disabled?: boolean;
}
export default class BirthdayField extends Component<IBirthdayFieldAttrs> {
    view(): JSX.Element;
}
