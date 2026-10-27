# Changelog

All notable changes to this extension are listed here. It follows [Semantic Versioning](https://semver.org) and the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

## [Unreleased]

## [3.0.0] - 2026-10-27

Run `php flarum migrate` after updating. Birthdays and each member's show/hide choices carry over from 3.0.0-beta.1 and from 2.x.

### Added

- The Birthdays page lists today and the next seven days, grouped by day.
- A cake badge next to the member's name on their birthday.
- A "happy birthday" notification, sent daily by `php flarum birthdays:notify` through the Flarum scheduler.
- A Birthday column in the admin users list.

### Changed

- **Breaking:** "Allow setting birthdays on registration" and "Required entering birthdays" are now one setting, Birthday at sign-up, with three choices. The migration converts your current choice.
- **Breaking:** user API attributes are renamed: `showDobDate` to `showBirthday`, `showDobYear` to `showAge`, `canEditOwnBirthday` to `canEditBirthday`.
- **Breaking:** `birthday` is only sent to the member and to people who can edit them. Everyone else gets `birthMonthDay` and `age`, each only when the member shows it.
- **Breaking:** `filter[birthday]` takes a date or a range of up to 31 days (`2026-10-27..2026-11-03`), returns only members who show their birthday, and returns nobody to actors without View birthdays.
- **Breaking:** the `showDobDate` and `showDobYear` columns are replaced by `show_birthday` and `show_age`.
- The show switches moved to Settings > Privacy. Change Birthday is a button under Account, next to Change Email.
- New members start with their age hidden.
- The forum bundle uses Flarum's own dayjs instead of shipping a copy with 30 locales, and is about a fifth of its former size.

### Removed

- **Breaking:** the two date format settings. Dates follow the forum language through the translation keys under `datlechin-birthdays.lib.datetime_formats`.
- Hiding the birthdays of suspended members.

### Fixed

- Turning off Show day and month of birth or Show year of birth failed with a database error ([#43](https://github.com/datlechin/flarum-birthdays/issues/43)).
- The API sent the full date of birth to anyone with View birthdays, including the parts a member had hidden.
- The birthday filter listed members who hid their birthday.
- The birthday filter failed on PostgreSQL and SQLite.
- The Birthdays page never finished loading on Flarum 2.
- Save Changes in the Edit Date of Birth dialog did nothing.
- The extension could not be installed alongside Flarum 2.0.2.
- Erasing a member's data with flarum/gdpr failed.
- Members born on February 29 never showed up in other years. They now celebrate on February 28.

## [3.0.0-beta.1] - 2026-02-24

### Changed

- **Breaking:** requires Flarum 2.0 and PHP 8.2.

### Removed

- Code left over from Flarum 1.x.

### Security

- Any user could edit any birthday when setting birthdays on registration was on.

### Fixed

- Birthday validation now applies during registration.
- The Birthdays page kept loading forever when the request failed.
- The Dutch translation of the required birthday message was missing.

## Earlier versions

Releases up to 2.1.2, for Flarum 1, are described on [GitHub Releases](https://github.com/datlechin/flarum-birthdays/releases).

[Unreleased]: https://github.com/datlechin/flarum-birthdays/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/datlechin/flarum-birthdays/compare/v3.0.0-beta.1...v3.0.0
[3.0.0-beta.1]: https://github.com/datlechin/flarum-birthdays/compare/v2.1.2...v3.0.0-beta.1
