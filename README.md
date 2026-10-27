# Birthdays

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md) [![Latest Stable Version](https://img.shields.io/packagist/v/datlechin/flarum-birthdays.svg)](https://packagist.org/packages/datlechin/flarum-birthdays) [![Total Downloads](https://img.shields.io/packagist/dt/datlechin/flarum-birthdays.svg)](https://packagist.org/packages/datlechin/flarum-birthdays) [![Sponsor](https://img.shields.io/github/sponsors/datlechin?logo=githubsponsors&label=Sponsor)](https://github.com/sponsors/datlechin)

Members add their birthday and choose what others see. The forum shows it on their profile, puts a cake next to their name on the day, lists who celebrates this week, and wishes them a happy birthday.

![A profile on the member's birthday](screenshots/profile.png)

## Install

```sh
composer require datlechin/flarum-birthdays
```

Then enable Birthdays under Admin > Extensions. Needs Flarum 2.0 and PHP 8.2.

Until you grant **View birthdays** to a group, only admins see other members' birthdays. See [Permissions](#permissions).

## What members see

**On a profile.** The birthday, the age, or both, depending on what the member shows.

| Show my birthday | Show my age | Others see |
| --- | --- | --- |
| on | on | Birthday October 27, age 36 |
| on | off | Birthday October 27 |
| off | on | Age 36 |
| off | off | Nothing |

The year is never shown on its own. Only the member and moderators who can edit them get the full date.

**A badge.** On the day, a cake badge sits next to the member's name on their profile and posts.

**The Birthdays page.** Linked from the sidebar, it lists who celebrates today and in the next seven days, grouped by day. Members who hide their birthday are left out.

![The Birthdays page](screenshots/birthdays-page.png)

**A greeting.** On their birthday, members get a "happy birthday" notification. They can turn it off in their notification settings like any other.

## What members set

Under Settings:

- **Account > Add Birthday / Change Birthday** to set or clear the date.
- **Privacy > Show my birthday on my profile** and **Show my age on my profile.** New members start with the birthday shown and the age hidden.

![Settings](screenshots/settings.png)

Moderators can also set a member's birthday from the Edit User dialog.

## Settings

Admin > Extensions > Birthdays.

| Setting | Default | What it does |
| --- | --- | --- |
| Birthday at sign-up | Don't ask | Don't ask, ask and allow skipping, or ask and require it. |
| Minimum age | 13 | Checked every time a birthday is saved. 0 still refuses dates in the future. |

Dates use the forum language. To change a format, override the keys under `datlechin-birthdays.lib.datetime_formats` with a language pack or [Linguist](https://github.com/FriendsOfFlarum/linguist).

## Permissions

| Permission | Default | Allows |
| --- | --- | --- |
| View birthdays | Admins | Seeing what members chose to show, and the Birthdays page. |
| Edit own birthday | Members | Setting and clearing your own birthday. |

The Birthdays page lists users, so it also needs core's **Search users** permission.

Moderators who can edit a user can also see and change that user's full birthday.

## The greeting

`php flarum birthdays:notify` sends it. It runs once a day through the [Flarum scheduler](https://docs.flarum.org/2.x/scheduler), so make sure the scheduler's cron entry is set up. It uses the server's date, and running it twice on the same day sends nothing new.

Members born on February 29 are greeted and listed on February 28 in other years.

## Update

```sh
composer update datlechin/flarum-birthdays
php flarum migrate
php flarum cache:clear
```

Coming from 2.x? Birthdays and each member's choices carry over. Read the [3.0.0 notes](CHANGELOG.md#300) for what changed.

## For extension authors

User attributes in the API:

| Attribute | Sent to | Value |
| --- | --- | --- |
| `birthday` | The member, and those who can edit them. Writable by the same people. | `YYYY-MM-DD` or `null` |
| `birthMonthDay` | Anyone with View birthdays, when the member shows their birthday | `MM-DD` |
| `age` | Anyone with View birthdays, when the member shows their age | Integer |
| `showBirthday`, `showAge` | The member, and those who can edit them. Writable. | Boolean |
| `canEditBirthday` | Everyone | Boolean |

The forum resource has `canViewBirthdays`.

Filter users by the day they celebrate. The value is a date or a range of up to 31 days, and results come soonest first:

```
GET /api/users?filter[birthday]=2026-10-27
GET /api/users?filter[birthday]=2026-12-29..2027-01-04
```

The notification type is `birthday`, with the member as its subject.

## Links

- [Packagist](https://packagist.org/packages/datlechin/flarum-birthdays)
- [GitHub](https://github.com/datlechin/flarum-birthdays)
- [Discuss](https://discuss.flarum.org/d/29793)
