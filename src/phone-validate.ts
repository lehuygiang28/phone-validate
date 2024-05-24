import { ALL_PROVIDERS_REGEX, VIRTUAL_PROVIDERS_REGEX } from './regex';
import { PhoneInfo, ValidateOptions } from './types';

/**
 * Get information about a phone number
 *
 * @param {string} phoneNumber A phone number to validate
 * @param {ValidateOptions} options Optional options
 * @param {('0' | '84' | '+84')[]} [options.startWith] - The allowed prefixes for the phone number. Defaults to ['0'].
 * @returns {PhoneInfo} Information about the phone number
 * @throws {Error} phoneNumber is invalid
 */
export function getVNPhoneInfo(phoneNumber: string, options?: ValidateOptions): PhoneInfo {
    if (!phoneNumber || !phoneNumber.trim() || phoneNumber === null || phoneNumber === undefined) {
        throw new Error('phoneNumber is invalid');
    }

    /**
     * Prefix and the length of input phone number
     *
     * Eg:
     *  - With prefix 0, phone number what valid must be: 0123456789, and length is 10
     *  - With prefix 84, phone number what valid must be: 84123456789, and length is 11
     *  - With prefix 84, phone number what valid must be: +84123456789, and length is 12
     */
    const prefixes: Record<string, number> = {
        '0': 10,
        '84': 11,
        '+84': 12,
    };

    let { startWith } = options || {};
    if (!options || !startWith?.length) {
        startWith = ['0'];
    }

    let provider: string | undefined = undefined;
    let isVirtual = false;

    if (phoneNumber) {
        for (const prefix of startWith) {
            const length = prefixes[prefix];
            if (!length || phoneNumber.length !== length) {
                continue;
            }
            const escapedPrefix = prefix.replace('+', '\\+');
            for (const [key, pattern] of Object.entries(ALL_PROVIDERS_REGEX)) {
                const regex = new RegExp(`^${escapedPrefix}${pattern.source}`);
                if (regex.test(phoneNumber)) {
                    provider = key;
                    isVirtual = key in VIRTUAL_PROVIDERS_REGEX;
                    break;
                }
            }
            if (provider) {
                break;
            }
        }
    }

    return {
        valid: provider !== undefined,
        number: phoneNumber,
        virtualProvider: isVirtual,
        provider: provider,
    };
}

/**
 * Checks if a given phone number is a valid Vietnamese phone number.
 *
 * @param {string} phoneNumber - The phone number to validate.
 * @param {ValidateOptions} [options] - Optional options for validation.
 * @param {('0' | '84' | '+84')[]} [options.startWith] - The allowed prefixes for the phone number. Defaults to ['0'].
 * @return {boolean} Returns true if the phone number is valid, false otherwise.
 * @throws {Error} phoneNumber is invalid
 */
export function isValidVNPhone(phoneNumber: string, options?: ValidateOptions): boolean {
    const info = getVNPhoneInfo(phoneNumber, options);
    return info.valid;
}
