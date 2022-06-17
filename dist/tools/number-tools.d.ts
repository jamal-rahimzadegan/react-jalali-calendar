declare type NestedObject = {
    [key: string]: any;
};
declare class NumberTools {
    PERSIAN_DIGITS: readonly string[];
    ENGLISH_DIGITS: readonly string[];
    REGEX_LIST: NestedObject;
    constructor();
    private sanitizedTxt;
    toEnglishDigit(txt: string): string;
    toPersian(txt: string | number): string;
    toCurrency(amount: string | number): string;
    shortenNumber(num: number | string): string;
    addLeadingZero(num: number | string): string;
}
declare const _default: NumberTools;
export default _default;
