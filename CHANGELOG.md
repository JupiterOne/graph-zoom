# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.0] - 2022-07-29

### Changed

- Authentication is now performed using server-to-server OAuth instead of client
  OAuth.

## [1.3.0] - 2022-01-26

### Added

- Added `admin` boolean flag to `zoom_role` -- `admin: true` if the role name is
  `Admin` or `Owner`.

## [1.2.0] - 2022-01-24

### Fixed

- Switched zoom_account to be Account \_class.
- Small cleanup of managed questions to alias results.

## [1.1.1] - 2022-01-05

### Fixed

- Properly including questions file in NPM package.

## [1.1.0] - 2022-01-05

### Added

- Questions file now in place with canned J1QL Zoom queries.

### Fixed

- Rate limiting added for handling 429 errors.
- Small documentation updates.

## [1.0.0] - 2021-11-24

### Added

- Ingest new entity `zoom_user`
- Ingest new entity `zoom_group`
- Ingest new entity `zoom_role`
- Ingest new entity `zoom_account`
- Build new relationship `zoom_account_has_user`
- Build new relationship `zoom_account_has_group`
- Build new relationship `zoom_account_has_role`
- Build new relationship `zoom_group_has_user`
- Build new relationship `zoom_user_assigned_role`
