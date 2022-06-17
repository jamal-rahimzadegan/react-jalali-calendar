// @ts-nocheck
const REGEX = {
  PER_NUM: /[۰-۹]/g,
  EN_NUM: /[0-9]/g
}

enum COLORS {
  TXT = '#000',
  TRANSPARENT = 'transparent',
  ACCENT = '#273c75',
  HOLIDAY_BG = '#F24919',
  HOLIDAY_TXT = '#290000',
  NORMAL_DAY_BG = '#bcbcbc',
  TODAY_BG = '#666666',
  BORDER = '#414141'
}

enum WEEK_DAYS {
  'Saturday' = 'شنبه',
  'Sunday' = 'یکشنبه',
  'Monday' = 'دوشنبه',
  'Tuesday' = 'سەشنبە',
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
