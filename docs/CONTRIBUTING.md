# Contributing

## Continuous Integration

We accept efforts to approach continuous integration. Please submit the smallest possible initial PR to learn quickly if your intentions are desired. Feel free to use any easily understandable and lowest risk methods to complete a small PR before your work is complete.

**If these contribution guidelines are daunting, try starting with a small incomplete PR first.**

## Small Files and Units

Please define only 1 function per file and keep functions small.

## The Pre-Commit Hook

Your changes should be adjusted to pass the pre-commit hook. Please only use `git commit --no-verify` to bypass pre-existing issues outside the scope of your changes. If you must use the `--no-verify` bypass, please first reorder the `.husky\pre-commit` file to list the failing script last.

The Jest config global coverage **branches** threshold percentage should not be lowered to bypass the pre-commit hook. The same is also generally true for similar things such as disabling comments to bypass other checks.

## Unit Test

### Prioritize Conditionals

Run `npm run jest` to generate the clover coverage report.

Run `npm run st` to help locate the highest priority files with conditionals to unit test.

Define a snapshot test. Please reference existing `snap` function definitions and search for `spyOn` for the most complex examples.

### Other Coverage

It is permitted to lower Jest config global coverage functions, lines, or statements threshold percentage as long as branches are 100 percent covered.
