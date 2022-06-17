import React, { createContext, useContext, Fragment, useState, useEffect } from 'react';
import jalaali from 'jalaali-js';

const CalenderContext = createContext({});

var COLORS;

(function (COLORS) {
  COLORS["TXT"] = "#000";
  COLORS["TRANSPARENT"] = "transparent";
  COLORS["ACCENT"] = "#273c75";
  COLORS["HOLIDAY_BG"] = "#F24919";
  COLORS["HOLIDAY_TXT"] = "#290000";
  COLORS["NORMAL_DAY_BG"] = "#bcbcbc";
  COLORS["TODAY_BG"] = "#666666";
  COLORS["BORDER"] = "#414141";
})(COLORS || (COLORS = {}));

var WEEK_DAYS;

(function (WEEK_DAYS) {
  WEEK_DAYS["Saturday"] = "\u0634\u0646\u0628\u0647";
  WEEK_DAYS["Sunday"] = "\u06CC\u06A9\u0634\u0646\u0628\u0647";
  WEEK_DAYS["Monday"] = "\u062F\u0648\u0634\u0646\u0628\u0647";
  WEEK_DAYS["Tuesday"] = "\u0633\u06D5\u0634\u0646\u0628\u06D5";
  WEEK_DAYS["Wednesday"] = "\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647";
  WEEK_DAYS["Thursday"] = "\u067E\u0646\u062C\u0634\u0646\u0628\u0647";
  WEEK_DAYS["Friday"] = "\u062C\u0645\u0639\u0647";
})(WEEK_DAYS || (WEEK_DAYS = {}));

var PERSIAN_MONTH;

(function (PERSIAN_MONTH) {
  PERSIAN_MONTH[PERSIAN_MONTH["\u0641\u0631\u0648\u0631\u062F\u06CC\u0646"] = 0] = "\u0641\u0631\u0648\u0631\u062F\u06CC\u0646";
  PERSIAN_MONTH[PERSIAN_MONTH["\u0627\u0631\u062F\u06CC\u0628\u0647\u0634\u062A"] = 1] = "\u0627\u0631\u062F\u06CC\u0628\u0647\u0634\u062A";
  PERSIAN_MONTH[PERSIAN_MONTH["\u062E\u0631\u062F\u0627\u062F"] = 2] = "\u062E\u0631\u062F\u0627\u062F";
  PERSIAN_MONTH[PERSIAN_MONTH["\u062A\u06CC\u0631"] = 3] = "\u062A\u06CC\u0631";
  PERSIAN_MONTH[PERSIAN_MONTH["\u0645\u0631\u062F\u0627\u062F"] = 4] = "\u0645\u0631\u062F\u0627\u062F";
  PERSIAN_MONTH[PERSIAN_MONTH["\u0634\u0647\u0631\u06CC\u0648\u0631"] = 5] = "\u0634\u0647\u0631\u06CC\u0648\u0631";
  PERSIAN_MONTH[PERSIAN_MONTH["\u0645\u0647\u0631"] = 6] = "\u0645\u0647\u0631";
  PERSIAN_MONTH[PERSIAN_MONTH["\u0622\u0628\u0627\u0646"] = 7] = "\u0622\u0628\u0627\u0646";
  PERSIAN_MONTH[PERSIAN_MONTH["\u0622\u0630\u0631"] = 8] = "\u0622\u0630\u0631";
  PERSIAN_MONTH[PERSIAN_MONTH["\u062F\u06CC"] = 9] = "\u062F\u06CC";
  PERSIAN_MONTH[PERSIAN_MONTH["\u0628\u0647\u0645\u0646"] = 10] = "\u0628\u0647\u0645\u0646";
  PERSIAN_MONTH[PERSIAN_MONTH["\u0627\u0633\u0641\u0646\u062F"] = 11] = "\u0627\u0633\u0641\u0646\u062F";
})(PERSIAN_MONTH || (PERSIAN_MONTH = {}));

class PersianDateTools {
  constructor() {
    this.convertToIntlDate = (year, month, day) => {
      return jalaali.jalaaliToDateObject(year, month, day);
    };

    this.getMonthLength = (year, month) => {
      return jalaali.jalaaliMonthLength(year, month);
    };

    this.locale = 'fa';
    this.todayDateIntl = new Date(Date.now());
    this.todayDatePer = jalaali.toJalaali(this.todayDateIntl);
  }

  static getSingletonInstance() {
    if (!PersianDateTools.instance) PersianDateTools.instance = new PersianDateTools();
    return PersianDateTools.instance;
  }

  grabDate(options) {
    return this.todayDateIntl.toLocaleDateString(this.locale, options);
  }

  get currentDate() {
    return {
      year: this.todayDatePer.jy,
      month: {
        number: this.todayDatePer.jm,
        name: this.grabDate({
          month: 'long'
        })
      },
      day: {
        number: this.todayDatePer.jd,
        name: this.grabDate({
          weekday: 'long'
        })
      }
    };
  }

  getMonthNameByNumber(num) {
    return PERSIAN_MONTH[num - 1];
  }

  getFirstDayOfMonth(year, month) {
    return this.convertToIntlDate(year, month, 2).getDay();
  }

  isOnCurrentMonth(monthNumber) {
    return this.getMonthNameByNumber(monthNumber) === this.currentDate.month.name;
  }

  isToday(year, month, day) {
    if (year !== this.currentDate.year) return false;
    if (month !== this.currentDate.month.number) return false;
    return day === this.todayDatePer.jd;
  }

  isFriday(dayInWeek) {
    return dayInWeek === 6;
  }

}

var perDate = PersianDateTools.getSingletonInstance();

var styles = {"calendar":"_styles__calendar__3ql79","calendarDayContainer":"_styles__calendarDayContainer__3L-TC","calendarDays":"_styles__calendarDays__2oWKM","calendarDayNumber":"_styles__calendarDayNumber__2_d8u"};

function RenderDays(props) {
  const {
    week
  } = props;
  const {
    year,
    month,
    selectMethod,
    selectedDay,
    setSelectedDay,
    onSelect
  } = useContext(CalenderContext);

  const checkIfSelectedDay = dayValue => {
    if (!dayValue) return false;
    return (selectedDay === null || selectedDay === void 0 ? void 0 : selectedDay.dayNumber) === dayValue;
  };

  const applyDayTxtColor = (dayInWeek, dayValue) => {
    if (perDate.isToday(year, month, dayValue)) return COLORS.TXT;
    if (checkIfSelectedDay(dayValue)) return COLORS.TXT;
    if (perDate.isFriday(dayInWeek)) return COLORS.HOLIDAY_TXT;else return COLORS.TXT;
  };

  const applyDyBgColor = (dayValue, dayInWeek) => {
    const {
      HOLIDAY_BG,
      TODAY_BG,
      TRANSPARENT,
      NORMAL_DAY_BG,
      ACCENT
    } = COLORS;
    if (!dayValue) return TRANSPARENT;
    if (checkIfSelectedDay(dayValue)) return ACCENT;
    if (perDate.isToday(year, month, dayValue)) return TODAY_BG;
    if (perDate.isFriday(+dayInWeek)) return HOLIDAY_BG;
    return NORMAL_DAY_BG;
  };

  const handleDayClick = (dayValue, dayInWeek) => {
    if (!dayValue) return;
    let selectionInfo;
    const clickedDayInfo = {
      year,
      month,
      dayNumber: dayValue,
      dayLabel: Object.values(WEEK_DAYS)[dayInWeek]
    };
    if (selectMethod === 'single') selectionInfo = pickSingleDay(clickedDayInfo);

    onSelect(selectionInfo);
  };

  const pickSingleDay = clickedDayInfo => {
    setSelectedDay((selectedDay === null || selectedDay === void 0 ? void 0 : selectedDay.dayNumber) === clickedDayInfo.dayNumber ? {} : clickedDayInfo);
    return clickedDayInfo;
  };

  return React.createElement("tr", null, Object.entries(week).map(([dayInWeek, dayValue], i) => React.createElement("td", {
    key: dayValue || dayInWeek + `${i}`,
    onClick: () => handleDayClick(dayValue, +dayInWeek),
    className: styles.calendarDayNumber,
    style: {
      color: applyDayTxtColor(+dayInWeek, dayValue),
      backgroundColor: applyDyBgColor(dayValue, +dayInWeek)
    }
  }, dayValue)));
}

function DaysBox(props) {
  const {
    calenderWeekList
  } = props;
  return React.createElement("table", {
    className: styles.calendarDayContainer
  }, React.createElement("thead", null, React.createElement("tr", null, Object.values(WEEK_DAYS).map(dayItem => React.createElement("td", {
    key: dayItem,
    className: styles.calendarDays
  }, dayItem)))), React.createElement("tbody", null, calenderWeekList.map((week, i) => React.createElement(Fragment, {
    key: i + Math.random()
  }, React.createElement(RenderDays, {
    week: week
  })))));
}

var styles$1 = {"calendar__header":"_styles__calendar__header__19Y7f"};

function Header() {
  const {
    changeMonth,
    currentYear,
    currentMonth
  } = useContext(CalenderContext);
  return React.createElement("header", {
    className: styles$1.calendar__header
  }, React.createElement("button", {
    onClick: () => changeMonth('prev'),
    children: '\u2039'
  }), React.createElement("p", null, currentMonth, " - ", currentYear), React.createElement("button", {
    onClick: () => changeMonth('next'),
    children: '\u203A'
  }));
}

function generateArr(length, formatArr) {
  return Array.from({
    length
  }, (v, k) => !!formatArr && formatArr(v, k));
}

class NumberTools {
  constructor() {
    this.PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    this.ENGLISH_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    this.REGEX_LIST = {
      engNum: /[0-9]/g,
      perNum: [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g]
    };
  }

  sanitizedTxt(txt) {
    if ([undefined, null].includes(txt)) return '';
    if (typeof txt === 'number') return txt.toString();
    return txt;
  }

  toEnglishDigit(txt) {
    txt = this.sanitizedTxt(txt);
    let i = 0;

    for (i; i < this.PERSIAN_DIGITS.length; i++) {
      txt = txt.replace(this.REGEX_LIST.perNum[i], i);
    }

    return txt;
  }

  toPersian(txt) {
    txt = this.sanitizedTxt(txt);
    return txt.replace(this.REGEX_LIST.engNum, w => this.PERSIAN_DIGITS[+w]);
  }

  toCurrency(amount) {
    amount = this.sanitizedTxt(amount);
    return amount;
  }

  shortenNumber(num) {
    num = this.sanitizedTxt(num);
    return new Intl.NumberFormat('en', {
      notation: 'compact'
    }).format(num);
  }

  addLeadingZero(num) {
    num = this.sanitizedTxt(num);
    return String(num).padStart(2, '0');
  }

}

var numberTools = new NumberTools();

function Calendar(props) {
  const {
    onSelect,
    customHeader
  } = props;
  const {
    currentDate
  } = perDate;
  const [year, setYear] = useState(currentDate.year);
  const [month, setMonth] = useState(currentDate.month.number);
  const [selectedDay, setSelectedDay] = useState({});
  const [daysRange, setDaysRange] = useState({});
  const selectMethod = 'single';
  const monthLength = perDate.getMonthLength(year, month);
  const firstDayOfMonth = perDate.getFirstDayOfMonth(year, month);
  const numberOfRows = firstDayOfMonth > 4 ? 6 : 5;

  const generateCalenderWeeks = () => {
    let currentDay = 1;

    const createWeekData = i => {
      const data = {};
      generateArr(7).forEach((item, j) => data[j] = getDayValue(j, i));
      return data;
    };

    const getDayValue = (weekDayNumber, i) => {
      if (currentDay > monthLength) return;
      if (i !== 0) return currentDay++;
      if (i === 0 && weekDayNumber >= firstDayOfMonth) return currentDay++;
    };

    return () => {
      return generateArr(numberOfRows).map((item, i) => createWeekData(i));
    };
  };

  const calenderWeekList = generateCalenderWeeks();

  const resetSelectedDay = () =>  setSelectedDay({});

  const changeMonth = action => {
    if (action === 'prev') {
      if (month >= 2) return setMonth(month - 1);else {
        setYear(year - 1);
        setMonth(12);
      }
    }

    if (action === 'next') {
      if (month <= 11) return setMonth(month + 1);else {
        setYear(year + 1);
        setMonth(1);
      }
    }
  };

  const sharedItems = {
    year,
    month,
    selectedDay,
    daysRange,
    setDaysRange,
    setSelectedDay,
    selectMethod,
    setMonth,
    setYear,
    onSelect,
    changeMonth,
    currentMonth: perDate.getMonthNameByNumber(month),
    currentYear: numberTools.toPersian(year)
  };
  const headerProps = {
    gotToNextMonth: () => changeMonth('next'),
    gotToPrevMonth: () => changeMonth('prev'),
    activeDate: {
      month: sharedItems.currentMonth,
      year: sharedItems.currentYear
    }
  };
  useEffect(resetSelectedDay, [month, year]);
  return React.createElement(CalenderContext.Provider, {
    value: sharedItems
  }, customHeader ? customHeader(headerProps) : React.createElement(Header, null), React.createElement(DaysBox, {
    calenderWeekList: calenderWeekList()
  }));
}

export { Calendar };
//# sourceMappingURL=index.modern.js.map
