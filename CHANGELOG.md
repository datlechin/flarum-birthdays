# Changelog

## 3.0.0

Requires Flarum 2.0 and PHP 8.2. Run `php flarum migrate` after updating. Birthdays and each member's show/hide choices carry over.

### Breaking

- "Set birthday on registration" and "Required" are now one setting, **Birthday at sign-up**, with three choices. The migration converts your current choice.
- The two date format settings are gone. Formats are translation keys under `datlechin-birthdays.lib.datetime_formats`.
- User API attributes renamed: `showDobDate` to `showBirthday`, `showDobYear` to `showAge`, `canEditOwnBirthday` to `canEditBirthday`.
- `birthday` is only sent to the member and to people who can edit them. Everyone else gets `birthMonthDay` and `age`, each only when the member shows it.
- `filter[birthday]` takes a date or a range (`2026-10-27..2026-11-03`) and only matches members who show their birthday, for actors with View birthdays.
- The `showDobDate` and `showDobYear` columns are replaced by `show_birthday` and `show_age`.
- New members start with their age hidden.
- Suspended members' birthdays are no longer hidden as a special case.

### Added

- The Birthdays page lists today and the next seven days, grouped by day.
- A cake badge next to the member's name on their birthday.
- A "happy birthday" notification, sent daily by `php flarum birthdays:notify` through the scheduler.
- A Birthday column in the admin users list.

### Changed

- Show my birthday and Show my age moved to Settings > Privacy. Change Birthday is a button under Account.
- The forum bundle no longer ships its own copy of dayjs and 30 locales, so it is about a fifth of its former size.

### Fixed

- Turning off Show day and month or Show year failed with a database error (#43).
- The API sent the full date of birth to anyone with View birthdays, including the parts a member had hidden.
- The birthday filter listed members who hid their birthday, and worked without View birthdays.
- The birthday filter failed on PostgreSQL and SQLite.
- The Birthdays page never loaded on Flarum 2.
- Save in the Change Date of Birth dialog did nothing.
- The extension could not be installed alongside Flarum 2.0.2.
- Erasing a member with flarum/gdpr failed.
- Members born on February 29 never showed up in other years. They now celebrate on February 28.
