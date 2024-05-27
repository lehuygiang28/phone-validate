# @vn-utils/phone-validate

<p align="center">
<a href="https://www.npmjs.com/package/@vn-utils/phone-validate" target="_blank"><img src="https://img.shields.io/npm/v/@vn-utils/phone-validate" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/@vn-utils/phone-validate" target="_blank"><img src="https://img.shields.io/npm/l/@vn-utils/phone-validate" alt="Package License"><a>
<a href="https://www.npmjs.com/package/@vn-utils/phone-validate" target="_blank"><img src="https://img.shields.io/npm/d18m/@vn-utils/phone-validate" alt="NPM Downloads"></a>
<a href='https://coveralls.io/github/lehuygiang28/phone-validate?branch=main'><img src='https://coveralls.io/repos/github/lehuygiang28/phone-validate/badge.svg?branch=main' alt='Coverage Status'/></a>
</p>

<strong>An open-source library support to validate Vietnamese phone number.</strong>

## Installation

### Node

```bash
$ npm install @vn-utils/phone-validate
# or
$ yarn add @vn-utils/phone-validate
#or
$ pnpm install @vn-utils/phone-validate
```

### Browser

#### Latest

```html
<script src="https://cdn.jsdelivr.net/npm/@vn-utils/phone-validate/lib/bundle.js"></script>
```

#### Selected version

```html
<script src="https://cdn.jsdelivr.net/npm/@vn-utils/phone-validate@<VERSION_HERE>/lib/bundle.js"></script>
```

## Usage

```ts
// ES Module
import { isValidVNPhone } from '@vn-utils/phone-validate';

// CommonJS
const { isValidVNPhone } = require('@vn-utils/phone-validate');
```

### isValidVNPhone

```ts
import { isValidVNPhone } from '@vn-utils/phone-validate';

isValidVNPhone('0981123456'); // true
isValidVNPhone('84981123456'), { startWith: ['0', '84'] }; // true
isValidVNPhone('+84981123456'), { startWith: ['+84'] }; // true

isValidVNPhone('0111111111'); // false
isValidVNPhone('some thing'); // false
isValidVNPhone('0111111111'); // false
```

### getVNPhoneInfo

```ts
import { getVNPhoneInfo } from '@vn-utils/phone-validate';

getVNPhoneInfo('0981123456');
// {
//   valid: true,
//   number: '+84981123456',
//   virtualProvider: false,
//   provider: 'Viettel'
// }
```

```html
<script>
    vnUtilsPhoneValidate.isValidVNPhone('0981123456');
    vnUtilsPhoneValidate.getVNPhoneInfo('0981123456');

    // Or
    var { isValidVNPhone, getVNPhoneInfo } = vnUtilsPhoneValidate;
    isValidVNPhone('0981123456');
    getVNPhoneInfo('0981123456');
</script>
```

## License

**[MIT](LICENSE) © [Lê Huy Giang](https://github.com/lehuygiang28)**

## Support

### This is an open-source and free project. If you find it useful, please consider supporting it by starring ⭐️ the repository on [Github](https://github.com/lehuygiang28/phone-validate) and buying me a coffee.

<a href="https://www.buymeacoffee.com/lehuygiang28" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" alt="Buy Me A Coffee"></a>

## Contributors

<a href="https://github.com/lehuygiang28/phone-validate/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lehuygiang28/phone-validate&max=20" />
</a>
