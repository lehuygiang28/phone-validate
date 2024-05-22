export type ValidateOptions = {
    /**
     * The allowed prefixes for the phone number. Defaults to ['0'].
     * @default ['0']
     */
    startWith: ('0' | '84' | '+84')[];
};

export type PhoneInfo = {
    /**
     * `true` if the phone number is valid, `false` otherwise
     */
    valid: boolean;

    /**
     * The phone number
     */
    number: string;

    /**
     * `true` if the phone number is a virtual provider, `false` otherwise
     */
    virtualProvider: boolean;

    /**
     * The name of the provider of the phone number, or `undefined` if the phone number is not valid
     */
    provider: string | undefined;
};
