export const PROVIDERS_REGEX = {
    Viettel: /(3[2-9]|9[6-8]|86)[0-9]{7}$/,
    Vinaphone: /((8[1-5|8]|9[1|4])[0-9]{7})$/,

    /**
     * 089 is both of Mobifone and Local,
     * So we not find 089 as Mobifone
     * Move it to `Mobifone & Local` bottom.
     */
    Mobifone: /(7[0|6-9]|9[0|3])[0-9]{7}$/,

    Vietnamobile: /(5[2|6|8]|92)[0-9]{7}$/,
    Gmobile: /(59|99)[0-9]{7}$/,
} as const;

export const VIRTUAL_PROVIDERS_REGEX = {
    // The order of the entries is based on the length of the number to match.
    // Entries with shorter numbers should come first.
    // For example, an entry with {6} should be placed before an entry with {7}.
    Vnsky: /(77[7|8])[0-9]{6}$/,
    FPT: /(775)[0-9]{6}$/,
    Wintel: /(55)[0-9]{7}$/,
    Itel: /(87)[0-9]{7}$/,
    Mobifone_Local: /(89)[0-9]{7}$/,
} as const;

export const ALL_PROVIDERS_REGEX = {
    // We should search for virtual providers first.
    // This is because a virtual provider may be a subset of a real provider.
    // For example, FPT is a subset of Mobifone (0775 is FPT, 077 is Mobifone).
    // Therefore, we should find FPT before Mobifone. Once FPT is found, we stop the search.
    ...VIRTUAL_PROVIDERS_REGEX,
    ...PROVIDERS_REGEX,
} as const;
