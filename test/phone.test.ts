import { getVNPhoneInfo, isValidVNPhone } from '../src';
import { ValidateOptions } from '../src/types';

describe('Phone number validation', () => {
    const options: ValidateOptions = { startWith: ['0', '84', '+84'] };
    const testCases = [
        {
            provider: 'Viettel',
            numbers: [
                // 032 - 039
                '0322174246',
                '0332174246',
                '0342174246',
                '0352174246',
                '0362174246',
                '0372174246',
                '0382174246',
                '0392174246',
                '84322174246',
                '84332174246',
                '84342174246',
                '84352174246',
                '84362174246',
                '84372174246',
                '84382174246',
                '84392174246',
                '+84322174246',
                '+84332174246',
                '+84342174246',
                '+84352174246',
                '+84362174246',
                '+84372174246',
                '+84382174246',
                '+84392174246',

                // 096 - 098
                '0961234567',
                '0971234567',
                '0981234567',
                '84961234567',
                '84971234567',
                '84981234567',
                '+84961234567',
                '+84971234567',
                '+84981234567',

                // 086
                '0862043092',
                '84862043092',
                '+84862043092',
            ],
        },
        {
            provider: 'Vinaphone',
            numbers: [
                // 081 - 085
                '0811234567',
                '0821234567',
                '0831234567',
                '0841234567',
                '0851234567',
                '84811234567',
                '84821234567',
                '84831234567',
                '84841234567',
                '84851234567',
                '+84811234567',
                '+84821234567',
                '+84831234567',
                '+84841234567',
                '+84851234567',

                // 088
                '0881234567',
                '84881234567',
                '+84881234567',

                // 091 & 094
                '0911234567',
                '0941234567',
                '84911234567',
                '84941234567',
                '+84911234567',
                '+84941234567',
            ],
        },
        {
            provider: 'Mobifone',
            numbers: [
                '0701234567',
                '0761234567',
                '0771234567',
                '0781234567',
                '0791234567',
                '0901234567',
                '0931234567',

                '84701234567',
                '84761234567',
                '84771234567',
                '84781234567',
                '84791234567',
                '84901234567',
                '84931234567',

                '+84701234567',
                '+84761234567',
                '+84771234567',
                '+84781234567',
                '+84791234567',
                '+84901234567',
                '+84931234567',
            ],
        },
        {
            provider: 'Vietnamobile',
            numbers: ['0921234567', '0521234567', '0561234567', '0581234567'],
        },
        { provider: 'Gmobile', numbers: ['0991234567', '0591234567'] },

        // Virtual providers
        { provider: 'Vnsky', numbers: ['0777123456', '0778123456'] },
        { provider: 'FPT', numbers: ['0775123456', '0775612345'] },
        { provider: 'Wintel', numbers: ['0551234567', '0559559123'] },
        { provider: 'Itel', numbers: ['0871234567', '0871321321'] },
        { provider: 'Mobifone_Local', numbers: ['0891234567', '0891321321'] },
    ];

    // Test each provider with multiple numbers
    testCases.forEach(({ provider, numbers }) => {
        numbers.forEach((number) => {
            test(`validates ${provider} number: ${number}`, () => {
                // Arrange
                const expectedValid = true;
                const expectedProvider = provider;

                // Act
                const info = getVNPhoneInfo(number, options);
                const isValid = isValidVNPhone(number, options);

                // Assert
                expect(info.valid).toBe(expectedValid);
                expect(info.provider).toBe(expectedProvider);
                expect(isValid).toBe(expectedValid);
            });
        });
    });

    // Test invalid numbers
    ['1234567890', 'abc', '00981212', '123', '', undefined, null, NaN].forEach(
        (invalidNumber, index) => {
            test(`invalid number - test case ${index + 1}`, () => {
                // Arrange
                const expectedValid = false;

                // Act
                const info = getVNPhoneInfo(invalidNumber as unknown as string, options);
                const isValid = isValidVNPhone(invalidNumber as unknown as string, options);

                // Assert
                expect(info.valid).toBe(expectedValid);
                expect(isValid).toBe(expectedValid);
            });
        },
    );
});
