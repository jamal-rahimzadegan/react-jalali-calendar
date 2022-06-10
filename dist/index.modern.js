import React, { createContext, useContext, useState, useEffect, Fragment } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import jalaali from 'jalaali-js';

const CalenderContext = createContext({});

let _ = t => t,
    _t;
const StyledHeader = styled.header(_t || (_t = _`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;
  border-bottom: ${0};

  button {
    cursor: pointer;
    color: ${0};
    background: ${0};
  }
`), ({
  lookAndFeel,
  theme
}) => `1px solid ${lookAndFeel.headBorderColor || theme.BORDER}`, ({
  lookAndFeel
}) => lookAndFeel.headTitleColor, ({
  lookAndFeel
}) => lookAndFeel.headBtnColor || 'transparent');

var COLORS;

(function (COLORS) {
  COLORS["TXT_FIRST"] = "#D2D2D2";
  COLORS["TRANSPARENT"] = "transparent";
  COLORS["ACCENT"] = "#273c75";
  COLORS["HOLIDAY_BG"] = "#473938";
  COLORS["HOLIDAY_TXT"] = "#E56C6E";
  COLORS["NORMAL_DAY_BG"] = "#3F3F3F";
  COLORS["TODAY_BG"] = "#2a2a2a";
  COLORS["BORDER"] = "#414141";
})(COLORS || (COLORS = {}));

var WEEK_DAYS;

(function (WEEK_DAYS) {
  WEEK_DAYS["Saturday"] = "\u0634\u0646\u0628\u0647";
  WEEK_DAYS["Sunday"] = "\u06CC\u06A9\u0634\u0646\u0628\u0647";
  WEEK_DAYS["Monday"] = "\u062F\u0648\u0634\u0646\u0628\u0647";
  WEEK_DAYS["Tuesday"] = "\u0633\u0647 \u0634\u0646\u0628\u0647";
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

function Header() {
  const {
    year,
    month,
    setMonth,
    setYear,
    lookAndFeel
  } = useContext(CalenderContext);

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

  return React.createElement(StyledHeader, {
    lookAndFeel: lookAndFeel
  }, React.createElement("button", {
    onClick: () => changeMonth('prev'),
    children: '\u2039'
  }), React.createElement("p", null, perDate.getMonthNameByNumber(month), " ", year), React.createElement("button", {
    onClick: () => changeMonth('next'),
    children: '\u203A'
  }));
}

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
    onSelect,
    lookAndFeel
  } = useContext(CalenderContext);
  const {
    currentDayBg,
    dayTextColor,
    holidayText,
    holidayBg,
    currentDayText,
    dayBgColor,
    todayBg,
    todayTxtColor
  } = lookAndFeel;

  const checkIfSelectedDay = dayValue => {
    if (!dayValue) return false;
    return (selectedDay === null || selectedDay === void 0 ? void 0 : selectedDay.dayNumber) === dayValue;
  };

  const applyDayTxtColor = (dayInWeek, dayValue) => {
    if (perDate.isToday(year, month, dayValue)) return todayTxtColor;
    if (checkIfSelectedDay(dayValue)) return currentDayText || COLORS.TXT_FIRST;
    if (perDate.isFriday(dayInWeek)) return holidayText || COLORS.HOLIDAY_BG;else return dayTextColor || COLORS.TXT_FIRST;
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
    if (checkIfSelectedDay(dayValue)) return currentDayBg || ACCENT;
    if (perDate.isToday(year, month, dayValue)) return todayBg || TODAY_BG;
    if (perDate.isFriday(+dayInWeek)) return holidayBg || HOLIDAY_BG;
    return dayBgColor || NORMAL_DAY_BG;
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
    if (selectMethod === "single") selectionInfo = pickSingleDay(clickedDayInfo);

    onSelect(selectionInfo);
  };

  const pickSingleDay = clickedDayInfo => {
    setSelectedDay((selectedDay === null || selectedDay === void 0 ? void 0 : selectedDay.dayNumber) === clickedDayInfo.dayNumber ? {} : clickedDayInfo);
    return clickedDayInfo;
  };

  return React.createElement("tr", null, Object.entries(week).map(([dayInWeek, dayValue], i) => React.createElement("td", {
    key: dayValue || dayInWeek + `${i}`,
    onClick: () => handleDayClick(dayValue, +dayInWeek),
    style: {
      color: applyDayTxtColor(+dayInWeek, dayValue),
      backgroundColor: applyDyBgColor(dayValue, +dayInWeek)
    }
  }, dayValue)));
}

function generateArr(length, formatArr) {
  return Array.from({
    length
  }, (v, k) => !!formatArr && formatArr(v, k));
}

var styles = {"calender":"_style-module__calender__2AoEL","calender__header":"_style-module__calender__header__1jeFP","calender__day-animate":"_style-module__calender__day-animate__3BSPf","animate-bg-color":"_style-module__animate-bg-color__2pQ6c"};

var COLORS$1;

(function (COLORS) {
  COLORS["TXT_FIRST"] = "#D2D2D2";
  COLORS["TRANSPARENT"] = "transparent";
  COLORS["ACCENT"] = "#273c75";
  COLORS["HOLIDAY_BG"] = "#473938";
  COLORS["HOLIDAY_TXT"] = "#E56C6E";
  COLORS["NORMAL_DAY_BG"] = "#3F3F3F";
  COLORS["TODAY_BG"] = "#2a2a2a";
  COLORS["BORDER"] = "#414141";
})(COLORS$1 || (COLORS$1 = {}));

function Calendar(props) {
  const {
    onSelect,
    style,
    className = ""
  } = props;
  const {
    currentDate
  } = perDate;
  const [year, setYear] = useState(currentDate.year);
  const [month, setMonth] = useState(currentDate.month.number);
  const [selectedDay, setSelectedDay] = useState({});
  const [daysRange, setDaysRange] = useState({});
  const selectMethod = "single";
  const monthLength = perDate.getMonthLength(year, month);
  const firstDayOfMonth = perDate.getFirstDayOfMonth(year, month);
  const calenderRowWeek = firstDayOfMonth > 4 ? 6 : 5;

  const generateCalenderWeeks = () => {
    let currentDay = 1;

    const getDayValue = (weekDayNumber, i) => {
      if (currentDay > monthLength) return;
      if (i !== 0) return currentDay++;
      if (i === 0 && weekDayNumber >= firstDayOfMonth) return currentDay++;
    };

    const createWeekData = i => {
      const data = {};
      generateArr(7).forEach((item, j) => data[j] = getDayValue(j, i));
      return data;
    };

    return () => generateArr(calenderRowWeek).map((item, i) => createWeekData(i));
  };

  const calenderWeekList = generateCalenderWeeks();

  const resetSelectedDay = () =>  setSelectedDay({});

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
    lookAndFeel: style
  };
  useEffect(resetSelectedDay, [month, year]);
  return React.createElement(ThemeProvider, {
    theme: COLORS$1
  }, React.createElement(CalenderContext.Provider, {
    value: sharedItems
  }, React.createElement(Header, null), React.createElement("div", {
    className: styles.calender + " " + className
  }, React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", {
    style: {
      color: style.weekDayNameColor,
      background: style.weekDayNameBg || "transparent"
    }
  }, Object.values(WEEK_DAYS).map(dayItem => React.createElement("td", {
    key: dayItem
  }, dayItem)))), React.createElement("tbody", null, calenderWeekList().map((week, i) => React.createElement(Fragment, {
    key: i + Math.random()
  }, React.createElement(RenderDays, {
    week: week
  }))))))));
}

export { Calendar };
//# sourceMappingURL=index.modern.js.map
