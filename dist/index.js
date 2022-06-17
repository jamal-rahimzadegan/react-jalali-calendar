function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var jalaali = _interopDefault(require('jalaali-js'));

var CalenderContext = React.createContext({});

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

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

var PersianDateTools = /*#__PURE__*/function () {
  function PersianDateTools() {
    this.convertToIntlDate = function (year, month, day) {
      return jalaali.jalaaliToDateObject(year, month, day);
    };

    this.getMonthLength = function (year, month) {
      return jalaali.jalaaliMonthLength(year, month);
    };

    this.locale = 'fa';
    this.todayDateIntl = new Date(Date.now());
    this.todayDatePer = jalaali.toJalaali(this.todayDateIntl);
  }

  PersianDateTools.getSingletonInstance = function getSingletonInstance() {
    if (!PersianDateTools.instance) PersianDateTools.instance = new PersianDateTools();
    return PersianDateTools.instance;
  };

  var _proto = PersianDateTools.prototype;

  _proto.grabDate = function grabDate(options) {
    return this.todayDateIntl.toLocaleDateString(this.locale, options);
  };

  _proto.getMonthNameByNumber = function getMonthNameByNumber(num) {
    return PERSIAN_MONTH[num - 1];
  };

  _proto.getFirstDayOfMonth = function getFirstDayOfMonth(year, month) {
    return this.convertToIntlDate(year, month, 2).getDay();
  };

  _proto.isOnCurrentMonth = function isOnCurrentMonth(monthNumber) {
    return this.getMonthNameByNumber(monthNumber) === this.currentDate.month.name;
  };

  _proto.isToday = function isToday(year, month, day) {
    if (year !== this.currentDate.year) return false;
    if (month !== this.currentDate.month.number) return false;
    return day === this.todayDatePer.jd;
  };

  _proto.isFriday = function isFriday(dayInWeek) {
    return dayInWeek === 6;
  };

  _createClass(PersianDateTools, [{
    key: "currentDate",
    get: function get() {
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
  }]);

  return PersianDateTools;
}();

var perDate = PersianDateTools.getSingletonInstance();

var styles = {"calendar":"_styles__calendar__3ql79","calendarDayContainer":"_styles__calendarDayContainer__3L-TC","calendarDays":"_styles__calendarDays__2oWKM","calendarDayNumber":"_styles__calendarDayNumber__2_d8u"};

function RenderDays(props) {
  var week = props.week;

  var _useContext = React.useContext(CalenderContext),
      year = _useContext.year,
      month = _useContext.month,
      selectMethod = _useContext.selectMethod,
      selectedDay = _useContext.selectedDay,
      setSelectedDay = _useContext.setSelectedDay,
      onSelect = _useContext.onSelect;

  var checkIfSelectedDay = function checkIfSelectedDay(dayValue) {
    if (!dayValue) return false;
    return (selectedDay === null || selectedDay === void 0 ? void 0 : selectedDay.dayNumber) === dayValue;
  };

  var applyDayTxtColor = function applyDayTxtColor(dayInWeek, dayValue) {
    if (perDate.isToday(year, month, dayValue)) return COLORS.TXT;
    if (checkIfSelectedDay(dayValue)) return COLORS.TXT;
    if (perDate.isFriday(dayInWeek)) return COLORS.HOLIDAY_TXT;else return COLORS.TXT;
  };

  var applyDyBgColor = function applyDyBgColor(dayValue, dayInWeek) {
    var HOLIDAY_BG = COLORS.HOLIDAY_BG,
        TODAY_BG = COLORS.TODAY_BG,
        TRANSPARENT = COLORS.TRANSPARENT,
        NORMAL_DAY_BG = COLORS.NORMAL_DAY_BG,
        ACCENT = COLORS.ACCENT;
    if (!dayValue) return TRANSPARENT;
    if (checkIfSelectedDay(dayValue)) return ACCENT;
    if (perDate.isToday(year, month, dayValue)) return TODAY_BG;
    if (perDate.isFriday(+dayInWeek)) return HOLIDAY_BG;
    return NORMAL_DAY_BG;
  };

  var handleDayClick = function handleDayClick(dayValue, dayInWeek) {
    if (!dayValue) return;
    var selectionInfo;
    var clickedDayInfo = {
      year: year,
      month: month,
      dayNumber: dayValue,
      dayLabel: Object.values(WEEK_DAYS)[dayInWeek]
    };
    if (selectMethod === 'single') selectionInfo = pickSingleDay(clickedDayInfo);

    onSelect(selectionInfo);
  };

  var pickSingleDay = function pickSingleDay(clickedDayInfo) {
    setSelectedDay((selectedDay === null || selectedDay === void 0 ? void 0 : selectedDay.dayNumber) === clickedDayInfo.dayNumber ? {} : clickedDayInfo);
    return clickedDayInfo;
  };

  return React__default.createElement("tr", null, Object.entries(week).map(function (_ref, i) {
    var dayInWeek = _ref[0],
        dayValue = _ref[1];
    return React__default.createElement("td", {
      key: dayValue || dayInWeek + ("" + i),
      onClick: function onClick() {
        return handleDayClick(dayValue, +dayInWeek);
      },
      className: styles.calendarDayNumber,
      style: {
        color: applyDayTxtColor(+dayInWeek, dayValue),
        backgroundColor: applyDyBgColor(dayValue, +dayInWeek)
      }
    }, dayValue);
  }));
}

function DaysBox(props) {
  var calenderWeekList = props.calenderWeekList;
  return React__default.createElement("table", {
    className: styles.calendarDayContainer
  }, React__default.createElement("thead", null, React__default.createElement("tr", null, Object.values(WEEK_DAYS).map(function (dayItem) {
    return React__default.createElement("td", {
      key: dayItem,
      className: styles.calendarDays
    }, dayItem);
  }))), React__default.createElement("tbody", null, calenderWeekList.map(function (week, i) {
    return React__default.createElement(React.Fragment, {
      key: i + Math.random()
    }, React__default.createElement(RenderDays, {
      week: week
    }));
  })));
}

var styles$1 = {"calendar__header":"_styles__calendar__header__19Y7f"};

function Header() {
  var _useContext = React.useContext(CalenderContext),
      changeMonth = _useContext.changeMonth,
      currentYear = _useContext.currentYear,
      currentMonth = _useContext.currentMonth;

  return React__default.createElement("header", {
    className: styles$1.calendar__header
  }, React__default.createElement("button", {
    onClick: function onClick() {
      return changeMonth('prev');
    },
    children: "\u2039"
  }), React__default.createElement("p", null, currentMonth, " - ", currentYear), React__default.createElement("button", {
    onClick: function onClick() {
      return changeMonth('next');
    },
    children: "\u203A"
  }));
}

function generateArr(length, formatArr) {
  return Array.from({
    length: length
  }, function (v, k) {
    return !!formatArr && formatArr(v, k);
  });
}

var NumberTools = /*#__PURE__*/function () {
  function NumberTools() {
    this.PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    this.ENGLISH_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    this.REGEX_LIST = {
      engNum: /[0-9]/g,
      perNum: [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g]
    };
  }

  var _proto = NumberTools.prototype;

  _proto.sanitizedTxt = function sanitizedTxt(txt) {
    if ([undefined, null].includes(txt)) return '';
    if (typeof txt === 'number') return txt.toString();
    return txt;
  };

  _proto.toEnglishDigit = function toEnglishDigit(txt) {
    txt = this.sanitizedTxt(txt);
    var i = 0;

    for (i; i < this.PERSIAN_DIGITS.length; i++) {
      txt = txt.replace(this.REGEX_LIST.perNum[i], i);
    }

    return txt;
  };

  _proto.toPersian = function toPersian(txt) {
    var _this = this;

    txt = this.sanitizedTxt(txt);
    return txt.replace(this.REGEX_LIST.engNum, function (w) {
      return _this.PERSIAN_DIGITS[+w];
    });
  };

  _proto.toCurrency = function toCurrency(amount) {
    amount = this.sanitizedTxt(amount);
    return amount;
  };

  _proto.shortenNumber = function shortenNumber(num) {
    num = this.sanitizedTxt(num);
    return new Intl.NumberFormat('en', {
      notation: 'compact'
    }).format(num);
  };

  _proto.addLeadingZero = function addLeadingZero(num) {
    num = this.sanitizedTxt(num);
    return String(num).padStart(2, '0');
  };

  return NumberTools;
}();

var numberTools = new NumberTools();

function Calendar(props) {
  var onSelect = props.onSelect,
      customHeader = props.customHeader;
  var currentDate = perDate.currentDate;

  var _useState = React.useState(currentDate.year),
      year = _useState[0],
      setYear = _useState[1];

  var _useState2 = React.useState(currentDate.month.number),
      month = _useState2[0],
      setMonth = _useState2[1];

  var _useState3 = React.useState({}),
      selectedDay = _useState3[0],
      setSelectedDay = _useState3[1];

  var _useState4 = React.useState({}),
      daysRange = _useState4[0],
      setDaysRange = _useState4[1];

  var selectMethod = 'single';
  var monthLength = perDate.getMonthLength(year, month);
  var firstDayOfMonth = perDate.getFirstDayOfMonth(year, month);
  var numberOfRows = firstDayOfMonth > 4 ? 6 : 5;

  var generateCalenderWeeks = function generateCalenderWeeks() {
    var currentDay = 1;

    var createWeekData = function createWeekData(i) {
      var data = {};
      generateArr(7).forEach(function (item, j) {
        return data[j] = getDayValue(j, i);
      });
      return data;
    };

    var getDayValue = function getDayValue(weekDayNumber, i) {
      if (currentDay > monthLength) return;
      if (i !== 0) return currentDay++;
      if (i === 0 && weekDayNumber >= firstDayOfMonth) return currentDay++;
    };

    return function () {
      return generateArr(numberOfRows).map(function (item, i) {
        return createWeekData(i);
      });
    };
  };

  var calenderWeekList = generateCalenderWeeks();

  var resetSelectedDay = function resetSelectedDay() {
    return  setSelectedDay({});
  };

  var changeMonth = function changeMonth(action) {
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

  var sharedItems = {
    year: year,
    month: month,
    selectedDay: selectedDay,
    daysRange: daysRange,
    setDaysRange: setDaysRange,
    setSelectedDay: setSelectedDay,
    selectMethod: selectMethod,
    setMonth: setMonth,
    setYear: setYear,
    onSelect: onSelect,
    changeMonth: changeMonth,
    currentMonth: perDate.getMonthNameByNumber(month),
    currentYear: numberTools.toPersian(year)
  };
  var headerProps = {
    gotToNextMonth: function gotToNextMonth() {
      return changeMonth('next');
    },
    gotToPrevMonth: function gotToPrevMonth() {
      return changeMonth('prev');
    },
    activeDate: {
      month: sharedItems.currentMonth,
      year: sharedItems.currentYear
    }
  };
  React.useEffect(resetSelectedDay, [month, year]);
  return React__default.createElement(CalenderContext.Provider, {
    value: sharedItems
  }, customHeader ? customHeader(headerProps) : React__default.createElement(Header, null), React__default.createElement(DaysBox, {
    calenderWeekList: calenderWeekList()
  }));
}

exports.Calendar = Calendar;
//# sourceMappingURL=index.js.map
