declare const REGEX: {
    PER_NUM: RegExp;
    EN_NUM: RegExp;
};
declare enum COLORS {
    TXT_FIRST = "#D2D2D2",
    TRANSPARENT = "transparent",
    ACCENT = "#273c75",
    HOLIDAY_BG = "#473938",
    HOLIDAY_TXT = "#E56C6E",
    NORMAL_DAY_BG = "#3F3F3F",
    TODAY_BG = "#2a2a2a",
    BORDER = "#414141"
}
declare enum WEEK_DAYS {
    'Saturday' = "\u0634\u0646\u0628\u0647",
    'Sunday' = "\u06CC\u06A9\u0634\u0646\u0628\u0647",
    'Monday' = "\u062F\u0648\u0634\u0646\u0628\u0647",
    'Tuesday' = "\u0633\u0647 \u0634\u0646\u0628\u0647",
    'Wednesday' = "\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647",
    'Thursday' = "\u067E\u0646\u062C\u0634\u0646\u0628\u0647",
    'Friday' = "\u062C\u0645\u0639\u0647"
}
declare enum PERSIAN_MONTH {
    فروردین = 0,
    اردیبهشت = 1,
    خرداد = 2,
    تیر = 3,
    مرداد = 4,
    شهریور = 5,
    مهر = 6,
    آبان = 7,
    آذر = 8,
    دی = 9,
    بهمن = 10,
    اسفند = 11
}
export { REGEX, COLORS, WEEK_DAYS, PERSIAN_MONTH };
