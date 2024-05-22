# phone-validate

<p align="center">
<a href="https://www.npmjs.com/package/@vn-utils/phone-validate" target="_blank"><img src="https://img.shields.io/npm/v/@vn-utils/phone-validate" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/@vn-utils/phone-validate" target="_blank"><img src="https://img.shields.io/npm/l/@vn-utils/phone-validate" alt="Package License"><a>
<a href="https://www.npmjs.com/package/@vn-utils/phone-validate" target="_blank"><img src="https://img.shields.io/npm/dm/@vn-utils/phone-validate" alt="NPM Downloads"></a>
</p>

<strong>An open-source library support to validate Vietnamese phone number.</strong>

## Installation

```bash
$ npm install @vn-utils/phone-validate
```

## Usage

### isValidVNPhone

```ts
import { isValidVNPhone } from '@vn-utils/phone-validate';

console.log(isValidVNPhone('0981123456')); // true
console.log(isValidVNPhone('84981123456'), { startWith: ['0', '84'] }); // true
console.log(isValidVNPhone('+84981123456'), { startWith: ['+84'] }); // true

console.log(isValidVNPhone('0111111111')); // false
console.log(isValidVNPhone('some thing')); // false
console.log(isValidVNPhone('0111111111')); // false
```

### getVNPhoneInfo

```ts
import { getVNPhoneInfo } from '@vn-utils/phone-validate';

console.log(getVNPhoneInfo('0981123456'));
// {
//   valid: true,
//   number: '+84981123456',
//   virtualProvider: false,
//   provider: 'Viettel'
// }
```

## Support

#### This is an open-source and free project. If you find it useful, please consider supporting it by starring ⭐️ the repository on [Github](https://github.com/lehuygiang28/phone-validate) and buying me a coffee.

<a href="https://www.buymeacoffee.com/lehuygiang28" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" alt="Buy Me A Coffee"></a>

### Contributors

<a href="https://github.com/lehuygiang28/phone-validate/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lehuygiang28/phone-validate&max=20" />
</a>
