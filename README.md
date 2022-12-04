# @clowd/suggest-test

## Purpose

This tool is meant to automate choosing the next file for which code coverage is needed. A `clover.xml` is parsed to suggest the next unit test to write.

## Getting Started

### Add a clover test reporter

> https://jestjs.io/docs/cli#--reporters

### Generate a coverage report

> https://jestjs.io/docs/cli#--coverageboolean

### Install @clowd/suggest-test

> `npm i -D @clowd/suggest-test`

### Add a `package.json` script

I recommend passing these flags to focus on conditionals and fully untested files.

```json
{
  "scripts": {
    "st": "suggest-test coverage/clover.xml --includeTested=false --includeStatements=false"
  }
}
```

### Execute the script

> `npm run st`

### Open your favorite coverage viewer

> Perhaps open `coverage/lcov-report/index.html` in your web browser

Tip: If you are at liberty to break a suggested file into smaller pieces and re-run the script, the re-run may point you to an even better file to test next.

### Write a test

> TODO: Link to opinionated unit test example.

### Security Concerns

[SECURITY.md](docs/SECURITY.md)
