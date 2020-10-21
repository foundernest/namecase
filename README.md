# NameCase

[![npm][ico-npm]][link-npm]
[![Build Status][ico-travis]][link-travis]
[![Coverage Status][ico-coveralls]][link-coveralls]
[![npm bundle size][ico-bundle-size]][link-bundle-size]

NameCase is a fully typed implementation of `Lingua::EN::NameCase`, a library for converting strings to be properly cased. This is good for converting denormalized data to human friendly data.

## Description

Forenames and surnames are often stored either entirely in UPPERCASE or lowercase. This library allows you to convert names into the correct case where possible. Although forenames and surnames are typically stored separately if they do appear in a single string, whitespace-separated, NameCase deals correctly with them.

Currently NameCase correctly name cases names which include any of the following:

```txt
Mc, Mac, al, el, ap, bat, ben, bin, binti, binte, da, de, das, dos, delle, della, di, du, del, der, den, ten, ter, la, le, lo, van and von.
```

It correctly deals with names which contain apostrophes and hyphens too.

## Installation

Via npm

```bash
npm install @foundernest/namecase
```

Via yarn

```bash
yarn add @foundernest/namecase
```

## Usage

### Basic usage

```typescript
import { nameCase } from '@foundernest/namecase';

nameCase('KEITH');               // => Keith
nameCase('LEIGH-WILLIAMS');      // => Leigh-Williams
nameCase('MCCARTHY');            // => McCarthy
nameCase("O'CALLAGHAN");         // => O'Callaghan
nameCase('ST. JOHN');            // => St. John
nameCase('VON STREIT');          // => von Streit
nameCase('AP LLWYD DAFYDD');     // => ap Llwyd Dafydd
nameCase('HENRY VIII');          // => Henry VIII
nameCase('VAN DYKE');            // => van Dyke
```

### Advance usage

You can override the default options by calling the `nameCase` function with the `EnvironmentOptions` optional parameter:

```typescript
import { nameCase } from '@foundernest/namecase';

nameCase('macmurdo');                        // => MacMurdo
nameCase('macmurdo', { irish: false });      // => Macmurdo
```

You can also set the options of all the subsequent calls:

```typescript
import { nameCase, setOptions } from '@foundernest/namecase';

nameCase('macmurdo');               // => MacMurdo
setOptions({ irish: false });
nameCase('macmurdo');               // => Macmurdo
```

Or you can even create a new `Environment` object with custom options:

```typescript
import Environment from '@foundernest/namecase';

const ncEnv = new Environment({
  lazy: false
  roman: false
});

ncEnv.nameCase('Na li');     // => Na Li
```

## Options

- `lazy` – Default: `true`. Do not do anything if string is already mixed case and lazy option is `true`.
- `irish` – Default: `true`. Correct "Mac" exceptions.
- `spanish` – Default: `true`. Correct spanish conjunctions `y`, `e` or `i`.
- `roman` – Default: `true`. Correct roman numbers.
- `hebrew` – Default: `true`. Correct `ben`, `bat`.
- `postnominal` – Default: `true`. Correct post-nominal. e.g. `PhD`.

## Exclude Post-Nominals

```typescript
import { excludePostNominals, nameCase } from '@foundernest/namecase';

nameCase('ČERNÝ MOST');         // Černý MOst
excludePostNominals('MOst');
nameCase('ČERNÝ MOST');         // Černý Most
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information about what has changed recently.

## Testing

```bash
yarn test
```

## Contributing

Please see the [Contributing guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) for details.

## Acknowledgements

This library is a port of the [PHP package](https://github.com/tamtamchik/namecase) by Yuri Tkachenko which is also a port of the [Perl library](https://metacpan.org/release/BARBIE/Lingua-EN-NameCase-1.19) and owes most of its functionality to the Perl version by Mark Summerfield.
Any bugs in the Typescript port are my fault.

## Credits

Original PERL `Lingua::EN::NameCase` Version:

- Copyright &copy; Mark Summerfield 1998-2014. All Rights Reserved.
- Copyright &copy; Barbie 2014-2020. All Rights Reserved.

Ruby Version:

- Copyright &copy; Aaron Patterson 2006. All Rights Reserved.

PHP Version:

- Copyright &copy; Yuri Tkachenko 2016-2020. All Rights Reserved.

Typescript version:

- Copyright &copy; [Daniel Seijo][link-author]

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

[ico-npm]: https://img.shields.io/npm/v/@foundernest/namecase
[ico-travis]: https://travis-ci.org/foundernest/namecase.svg?branch=master
[ico-coveralls]: https://coveralls.io/repos/github/foundernest/namecase/badge.svg?branch=master
[ico-bundle-size]: https://img.shields.io/bundlephobia/min/@foundernest/namecase

[link-npm]: https://www.npmjs.org/package/@foundernest/namecase
[link-travis]: https://travis-ci.org/foundernest/namecase
[link-coveralls]: https://coveralls.io/github/foundernest/namecase?branch=master
[link-bundle-size]: https://bundlephobia.com/result?p=@foundernest/namecase

[link-author]: https://github.com/daniseijo
