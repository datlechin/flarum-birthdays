import type Stream from 'flarum/common/utils/Stream';

declare module 'flarum/common/models/User' {
  export default interface User {
    birthday(): string | null | undefined;
    birthMonthDay(): string | undefined;
    age(): number | undefined;
    showBirthday(): boolean | undefined;
    showAge(): boolean | undefined;
    canEditBirthday(): boolean | undefined;
  }
}

declare module 'flarum/common/components/EditUserModal' {
  export default interface EditUserModal {
    birthday: Stream<string>;
  }
}

declare module 'flarum/forum/components/SignUpModal' {
  export default interface SignUpModal {
    birthday: Stream<string>;
  }
}
