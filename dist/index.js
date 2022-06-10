function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var styled = require('styled-components');
var styled__default = _interopDefault(styled);
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

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var _templateObject;
var StyledHeader = styled__default.header(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  padding: 10px 0;\n  border-bottom: ", ";\n\n  button {\n    cursor: pointer;\n    color: ", ";\n    background: ", ";\n  }\n"])), function (_ref) {
  var lookAndFeel = _ref.lookAndFeel,
      theme = _ref.theme;
  return "1px solid " + (lookAndFeel.headBorderColor || theme.BORDER);
}, function (_ref2) {
  var lookAndFeel = _ref2.lookAndFeel;
  return lookAndFeel.headTitleColor;
}, function (_ref3) {
  var lookAndFeel = _ref3.lookAndFeel;
  return lookAndFeel.headBtnColor || 'transparent';
});

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

function Header() {
  var _useContext = React.useContext(CalenderContext),
      year = _useContext.year,
      month = _useContext.month,
      setMonth = _useContext.setMonth,
      setYear = _useContext.setYear,
      lookAndFeel = _useContext.lookAndFeel;

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

  return React__default.createElement(StyledHeader, {
    lookAndFeel: lookAndFeel
  }, React__default.createElement("button", {
    onClick: function onClick() {
      return changeMonth('prev');
    },
    children: "\u2039"
  }), React__default.createElement("p", null, perDate.getMonthNameByNumber(month), " ", year), React__default.createElement("button", {
    onClick: function onClick() {
      return changeMonth('next');
    },
    children: "\u203A"
  }));
}

function RenderDays(props) {
  var week = props.week;

  var _useContext = React.useContext(CalenderContext),
      year = _useContext.year,
      month = _useContext.month,
      selectMethod = _useContext.selectMethod,
      selectedDay = _useContext.selectedDay,
      setSelectedDay = _useContext.setSelectedDay,
      onSelect = _useContext.onSelect,
      lookAndFeel = _useContext.lookAndFeel;

  var currentDayBg = lookAndFeel.currentDayBg,
      dayTextColor = lookAndFeel.dayTextColor,
      holidayText = lookAndFeel.holidayText,
      holidayBg = lookAndFeel.holidayBg,
      currentDayText = lookAndFeel.currentDayText,
      dayBgColor = lookAndFeel.dayBgColor,
      todayBg = lookAndFeel.todayBg,
      todayTxtColor = lookAndFeel.todayTxtColor;

  var checkIfSelectedDay = function checkIfSelectedDay(dayValue) {
    if (!dayValue) return false;
    return (selectedDay === null || selectedDay === void 0 ? void 0 : selectedDay.dayNumber) === dayValue;
  };

  var applyDayTxtColor = function applyDayTxtColor(dayInWeek, dayValue) {
    if (perDate.isToday(year, month, dayValue)) return todayTxtColor;
    if (checkIfSelectedDay(dayValue)) return currentDayText || COLORS.TXT_FIRST;
    if (perDate.isFriday(dayInWeek)) return holidayText || COLORS.HOLIDAY_BG;else return dayTextColor || COLORS.TXT_FIRST;
  };

  var applyDyBgColor = function applyDyBgColor(dayValue, dayInWeek) {
    var HOLIDAY_BG = COLORS.HOLIDAY_BG,
        TODAY_BG = COLORS.TODAY_BG,
        TRANSPARENT = COLORS.TRANSPARENT,
        NORMAL_DAY_BG = COLORS.NORMAL_DAY_BG,
        ACCENT = COLORS.ACCENT;
    if (!dayValue) return TRANSPARENT;
    if (checkIfSelectedDay(dayValue)) return currentDayBg || ACCENT;
    if (perDate.isToday(year, month, dayValue)) return todayBg || TODAY_BG;
    if (perDate.isFriday(+dayInWeek)) return holidayBg || HOLIDAY_BG;
    return dayBgColor || NORMAL_DAY_BG;
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
    if (selectMethod === "single") selectionInfo = pickSingleDay(clickedDayInfo);

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
      style: {
        color: applyDayTxtColor(+dayInWeek, dayValue),
        backgroundColor: applyDyBgColor(dayValue, +dayInWeek)
      }
    }, dayValue);
  }));
}

function generateArr(length, formatArr) {
  return Array.from({
    length: length
  }, function (v, k) {
    return !!formatArr && formatArr(v, k);
  });
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
  var onSelect = props.onSelect,
      style = props.style,
      _props$className = props.className,
      className = _props$className === void 0 ? "" : _props$className;
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

  var selectMethod = "single";
  var monthLength = perDate.getMonthLength(year, month);
  var firstDayOfMonth = perDate.getFirstDayOfMonth(year, month);
  var calenderRowWeek = firstDayOfMonth > 4 ? 6 : 5;

  var generateCalenderWeeks = function generateCalenderWeeks() {
    var currentDay = 1;

    var getDayValue = function getDayValue(weekDayNumber, i) {
      if (currentDay > monthLength) return;
      if (i !== 0) return currentDay++;
      if (i === 0 && weekDayNumber >= firstDayOfMonth) return currentDay++;
    };

    var createWeekData = function createWeekData(i) {
      var data = {};
      generateArr(7).forEach(function (item, j) {
        return data[j] = getDayValue(j, i);
      });
      return data;
    };

    return function () {
      return generateArr(calenderRowWeek).map(function (item, i) {
        return createWeekData(i);
      });
    };
  };

  var calenderWeekList = generateCalenderWeeks();

  var resetSelectedDay = function resetSelectedDay() {
    return  setSelectedDay({});
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
    lookAndFeel: style
  };
  React.useEffect(resetSelectedDay, [month, year]);
  return React__default.createElement(styled.ThemeProvider, {
    theme: COLORS$1
  }, React__default.createElement(CalenderContext.Provider, {
    value: sharedItems
  }, React__default.createElement(Header, null), React__default.createElement("div", {
    className: styles.calender + " " + className
  }, React__default.createElement("table", null, React__default.createElement("thead", null, React__default.createElement("tr", {
    style: {
      color: style.weekDayNameColor,
      background: style.weekDayNameBg || "transparent"
    }
  }, Object.values(WEEK_DAYS).map(function (dayItem) {
    return React__default.createElement("td", {
      key: dayItem
    }, dayItem);
  }))), React__default.createElement("tbody", null, calenderWeekList().map(function (week, i) {
    return React__default.createElement(React.Fragment, {
      key: i + Math.random()
    }, React__default.createElement(RenderDays, {
      week: week
    }));
  }))))));
}

exports.Calendar = Calendar;
//# sourceMappingURL=index.js.map
