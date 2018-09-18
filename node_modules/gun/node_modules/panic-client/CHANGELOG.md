# Changelog

## v1.0.1
## Fixed
- If `job.fail` was called with just a string, it wouldn't be used as an error message (regression from previous versions, now tested).
- If a failure doesn't provide an error message, panic now gives a default (another regression).

## v1.0.0
### Added
- Promise support. If you return a promise from a job, it's treated as an async job.
- You can now send values *back* to the server. Any value returned (or resolved) is sent back in the job report.
- The context is now passed as the first (and only) parameter.
- New `.async` method to replace the `done` parameter.

### Changed
- Jobs emit a report when finished, instead of an error or nothing. This gives the report details space to grow in the future.
- `this.data` renamed to `this.props` for clarity.
- `panic.connection` is now `panic.socket`.

### Removed
- Job#timeout has been removed. Use `setTimeout(this.fail)` instead.
- The `done` callback is no longer passed. Instead, use `var done = this.async()`, or return a promise.
- The socket is no longer accessible as `this.socket`. Use `panic.connection` instead.
- The `@scope` is no longer supported. It just caused too much confusion.

## v0.3.0
### Added
- Shared job state with `this.set` and `this.get`.

### Removed
- `panic.js` build from git. It'll still be published on npm.

## v0.2.0
### Changed
- The `done` callback is now the 1st parameter passed to peers instead of the second.
- Variable injection no longer happens by default, and the flag has changed to `'@scope'`.

### Added
- IE6 compatibility by adding polyfills (`arguments`, `function.length`, `eval` variable assignment over function expressions).

## v0.1.2
### Fixed
- Previous version build not updated.

## v0.1.1
### Added
- `platform` object now accessible to jobs as `this.platform`.

## v0.1.0
Initial release.
