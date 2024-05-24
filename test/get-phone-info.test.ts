import { getVNPhoneInfo } from '../src';
import { ValidateOptions } from '../src/types';

describe('getVNPhoneInfo', () => {
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

                // Assert
                expect(info.valid).toBe(expectedValid);
                expect(info.provider).toBe(expectedProvider);
                expect(info.number).toBe(number);
            });
        });
    });

    ['', undefined, null, NaN].forEach((invalidNumber) => {
        test(`should throw Error on invalid number: ${invalidNumber}`, () => {
            // Act & Assert
            expect(() => getVNPhoneInfo(invalidNumber as unknown as string, options)).toThrow(
                'phoneNumber is invalid',
            );
        });
    });

    ['1234567890', 'abc', '00981212', '123'].forEach((wrongNumber) => {
        test(`should validate wrong number: ${wrongNumber}`, () => {
            // Arrange
            const expectedValid = false;

            // Act
            const isValid = getVNPhoneInfo(wrongNumber, options);

            // Assert
            expect(isValid.valid).toBe(expectedValid);
            expect(isValid.provider).toBeUndefined();
            expect(isValid.number).toBe(wrongNumber);
            expect(isValid.virtualProvider).toBe(false);
        });
    });

    [
        { provider: 'Vnsky', numbers: ['0777123456', '0778123456'] },
        { provider: 'FPT', numbers: ['0775123456', '0775612345'] },
        { provider: 'Wintel', numbers: ['0551234567', '0559559123'] },
        { provider: 'Itel', numbers: ['0871234567', '0871321321'] },
        { provider: 'Mobifone_Local', numbers: ['0891234567', '0891321321'] },
    ].forEach(({ provider, numbers }) => {
        numbers.forEach((number) => {
            test(`should validate without options: ${provider} - ${number}`, () => {
                // Arrange
                const expectedValid = true;

                // Act
                const isValid = getVNPhoneInfo(number);

                // Assert
                expect(isValid.valid).toBe(expectedValid);
                expect(isValid.provider).toBe(provider);
                expect(isValid.number).toBe(number);
                expect(isValid.virtualProvider).toBe(true);
            });
        });
    });

    [
        { provider: 'Vnsky', numbers: ['0777123456', '0778123456'] },
        { provider: 'FPT', numbers: ['0775123456', '0775612345'] },
        { provider: 'Wintel', numbers: ['0551234567', '0559559123'] },
        { provider: 'Itel', numbers: ['0871234567', '0871321321'] },
        { provider: 'Mobifone_Local', numbers: ['0891234567', '0891321321'] },
    ].forEach(({ provider, numbers }) => {
        numbers.forEach((number) => {
            test(`should validate without options: ${provider} - ${number}`, () => {
                // Arrange
                const expectedValid = true;

                // Act
                const isValid = getVNPhoneInfo(number, { startWith: [] });

                // Assert
                expect(isValid.valid).toBe(expectedValid);
                expect(isValid.virtualProvider).toBe(expectedValid);
                expect(isValid.provider).toBe(provider);
                expect(isValid.number).toBe(number);
            });
        });
    });

    [
        { provider: 'Vnsky', numbers: ['0777123456', '0778123456'] },
        { provider: 'FPT', numbers: ['0775123456', '0775612345'] },
        { provider: 'Wintel', numbers: ['0551234567', '0559559123'] },
        { provider: 'Itel', numbers: ['0871234567', '0871321321'] },
        { provider: 'Mobifone_Local', numbers: ['0891234567', '0891321321'] },
    ].forEach(({ provider, numbers }) => {
        numbers.forEach((number) => {
            test(`should validate with options is '0': ${provider} - ${number}`, () => {
                // Arrange
                const expectedValid = true;

                // Act
                const isValid = getVNPhoneInfo(number, { startWith: ['0'] });

                // Assert
                expect(isValid.valid).toBe(expectedValid);
                expect(isValid.virtualProvider).toBe(expectedValid);
                expect(isValid.provider).toBe(provider);
                expect(isValid.number).toBe(number);
            });
        });
    });

    [
        { provider: 'Vnsky', numbers: ['0777123456', '0778123456'] },
        { provider: 'FPT', numbers: ['0775123456', '0775612345'] },
        { provider: 'Wintel', numbers: ['0551234567', '0559559123'] },
        { provider: 'Itel', numbers: ['0871234567', '0871321321'] },
        { provider: 'Mobifone_Local', numbers: ['0891234567', '0891321321'] },
    ].forEach(({ provider, numbers }) => {
        numbers.forEach((number) => {
            test(`should not validate with options not match: ${provider} - ${number}`, () => {
                // Arrange
                const expectedInvalid = false;

                // Act
                const isValid = getVNPhoneInfo(number, { startWith: ['84'] });

                // Assert
                expect(isValid.valid).toBe(expectedInvalid);
                expect(isValid.virtualProvider).toBe(expectedInvalid);
                expect(isValid.provider).toBeUndefined();
                expect(isValid.number).toBe(number);
            });
        });
    });

    [
        { provider: 'Vnsky', numbers: ['0777123456', '0778123456'] },
        { provider: 'FPT', numbers: ['0775123456', '0775612345'] },
        { provider: 'Wintel', numbers: ['0551234567', '0559559123'] },
        { provider: 'Itel', numbers: ['0871234567', '0871321321'] },
        { provider: 'Mobifone_Local', numbers: ['0891234567', '0891321321'] },
    ].forEach(({ provider, numbers }) => {
        numbers.forEach((number) => {
            test(`should not validate with options not match: ${provider} - ${number}`, () => {
                // Arrange
                const expectedInvalid = false;

                // Act
                const isValid = getVNPhoneInfo(number, { startWith: ['+84'] });

                // Assert
                expect(isValid.valid).toBe(expectedInvalid);
                expect(isValid.virtualProvider).toBe(expectedInvalid);
                expect(isValid.provider).toBeUndefined();
                expect(isValid.number).toBe(number);
            });
        });
    });

    [
        { provider: 'Vnsky', numbers: ['84777123456', '84778123456'] },
        { provider: 'FPT', numbers: ['84775123456', '84775612345'] },
        { provider: 'Wintel', numbers: ['84551234567', '84559559123'] },
        { provider: 'Itel', numbers: ['84871234567', '84871321321'] },
        { provider: 'Mobifone_Local', numbers: ['84891234567', '84891321321'] },
    ].forEach(({ provider, numbers }) => {
        numbers.forEach((number) => {
            test(`should validate with options '84': ${provider} - ${number}`, () => {
                // Arrange
                const expectedValid = true;

                // Act
                const isValid = getVNPhoneInfo(number, { startWith: ['84'] });

                // Assert
                expect(isValid.valid).toBe(expectedValid);
                expect(isValid.virtualProvider).toBe(expectedValid);
                expect(isValid.provider).toBe(provider);
                expect(isValid.number).toBe(number);
            });
        });
    });

    [
        { provider: 'Vnsky', numbers: ['84777123456', '84778123456'] },
        { provider: 'FPT', numbers: ['84775123456', '84775612345'] },
        { provider: 'Wintel', numbers: ['84551234567', '84559559123'] },
        { provider: 'Itel', numbers: ['84871234567', '84871321321'] },
        { provider: 'Mobifone_Local', numbers: ['84891234567', '84891321321'] },
    ].forEach(({ provider, numbers }) => {
        numbers.forEach((number) => {
            test(`should not validate with options is not '84': ${provider} - ${number}`, () => {
                // Arrange
                const expected = false;

                // Act
                const startWith0 = getVNPhoneInfo(number, { startWith: ['0'] });
                const startWithPlus84 = getVNPhoneInfo(number, { startWith: ['+84'] });

                // Assert
                expect(startWith0.valid).toBe(expected);
                expect(startWith0.virtualProvider).toBe(expected);
                expect(startWith0.provider).toBeUndefined();
                expect(startWith0.number).toBe(number);

                expect(startWithPlus84.valid).toBe(expected);
                expect(startWithPlus84.virtualProvider).toBe(expected);
                expect(startWithPlus84.provider).toBeUndefined();
                expect(startWithPlus84.number).toBe(number);
            });
        });
    });

    [
        { provider: 'Vnsky', numbers: ['+84777123456', '+84778123456'] },
        { provider: 'FPT', numbers: ['+84775123456', '+84775612345'] },
        { provider: 'Wintel', numbers: ['+84551234567', '+84559559123'] },
        { provider: 'Itel', numbers: ['+84871234567', '+84871321321'] },
        { provider: 'Mobifone_Local', numbers: ['+84891234567', '+84891321321'] },
    ].forEach(({ provider, numbers }) => {
        numbers.forEach((number) => {
            test(`should validate with options '+84': ${provider} - ${number}`, () => {
                // Arrange
                const expectedValid = true;

                // Act
                const isValid = getVNPhoneInfo(number, { startWith: ['+84'] });

                // Assert
                expect(isValid.valid).toBe(expectedValid);
                expect(isValid.virtualProvider).toBe(expectedValid);
                expect(isValid.provider).toBe(provider);
                expect(isValid.number).toBe(number);
            });
        });
    });

    [
        { provider: 'Vnsky', numbers: ['+84777123456', '+84778123456'] },
        { provider: 'FPT', numbers: ['+84775123456', '+84775612345'] },
        { provider: 'Wintel', numbers: ['+84551234567', '+84559559123'] },
        { provider: 'Itel', numbers: ['+84871234567', '+84871321321'] },
        { provider: 'Mobifone_Local', numbers: ['+84891234567', '+84891321321'] },
    ].forEach(({ provider, numbers }) => {
        numbers.forEach((number) => {
            test(`should not validate with options is not '+84': ${provider} - ${number}`, () => {
                // Arrange
                const expected = false;

                // Act
                const startWith0 = getVNPhoneInfo(number, { startWith: ['0'] });
                const startWith84 = getVNPhoneInfo(number, { startWith: ['84'] });

                // Assert
                expect(startWith0.valid).toBe(expected);
                expect(startWith0.virtualProvider).toBe(expected);
                expect(startWith0.provider).toBeUndefined();
                expect(startWith0.number).toBe(number);

                expect(startWith84.valid).toBe(expected);
                expect(startWith84.virtualProvider).toBe(expected);
                expect(startWith84.provider).toBeUndefined();
                expect(startWith84.number).toBe(number);
            });
        });
    });
});
