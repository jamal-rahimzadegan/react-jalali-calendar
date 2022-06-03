// @ts-nocheck
const REGEX = {
  PER_NUM: /[۰-۹]/g,
  EN_NUM: /[0-9]/g
}

enum COLORS {
  TXT_FIRST = '#D2D2D2',
  TRANSPARENT = 'transparent',
  ACCENT = '#273c75',
  HOLIDAY_BG = '#473938',
  HOLIDAY_TXT = '#E56C6E',
  NORMAL_DAY_BG = '#3F3F3F',
  TODAY_BG = '#2a2a2a',
  BORDER = '#414141'
}

enum WEEK_DAYS {
  'Saturday' = 'شنبه',
  'Sunday' = 'یکشنبه',
  'Monday' = 'دوشنبه',
  'Tuesday' = 'سه شنبه',
  'Wednesday' = 'چهارشنبه',
  'Thursday' = 'پنجشنبه',
  'Friday' = 'جمعه'
}

enum PERSIAN_MONTH {
  فروردین,
  اردیبهشت,
  خرداد,
  تیر,
  مرداد,
  شهریور,
  مهر,
  آبان,
  آذر,
  دی,
  بهمن,
  اسفند
}

export { REGEX, COLORS, WEEK_DAYS, PERSIAN_MONTH }
