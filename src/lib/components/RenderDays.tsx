import React, { useContext } from 'react'
import CalenderContext from '../calender-context'
import { COLORS, WEEK_DAYS } from '../constants'
import perDate from '../persian-date-tools'

interface Props {
  week: Week
}

export default function RenderDays(props: Props) {
  const { week } = props
  const {
    year,
    month,
    selectMethod,
    selectedDay,
    setSelectedDay,
    onSelect,
    style
  } = useContext(CalenderContext)
  const {
    currentDayBg,
    dayTextColor,
    holidayText,
    holidayBg,
    currentDayText,
    dayBgColor,
    todayBg,
    todayTxtColor
  } = style

  const checkIfSelectedDay = (dayValue: number): boolean => {
    if (!dayValue) return false
    return selectedDay?.dayNumber === dayValue
  }

  const applyDayTxtColor = (dayInWeek: number, dayValue: number): string => {
    if (perDate.isToday(year, month, dayValue)) return todayTxtColor
    if (checkIfSelectedDay(dayValue)) return currentDayText || COLORS.TXT_FIRST
    if (perDate.isFriday(dayInWeek)) return holidayText || COLORS.HOLIDAY_BG
    else return dayTextColor || COLORS.TXT_FIRST
  }

  const applyBgColor = (dayValue: number, dayInWeek: number): string => {
    const { HOLIDAY_BG, TODAY_BG, TRANSPARENT, NORMAL_DAY_BG, ACCENT } = COLORS

    if (!dayValue) return TRANSPARENT
    if (checkIfSelectedDay(dayValue)) return currentDayBg || ACCENT
    if (perDate.isToday(year, month, dayValue)) return todayBg || TODAY_BG
    if (perDate.isFriday(+dayInWeek)) return holidayBg || HOLIDAY_BG

    return dayBgColor || NORMAL_DAY_BG
  }

  const handleDayClick = (dayValue: number, dayInWeek: number) => {
    if (!dayValue) return

    let selectionInfo
    const clickedDayInfo = {
      year,
      month,
      dayNumber: dayValue,
      dayLabel: Object.values(WEEK_DAYS)[dayInWeek]
    }

    if (selectMethod === 'single') selectionInfo = pickSingleDay(clickedDayInfo)
    if (selectMethod === 'range') {
      // Todo: implement it later
      // selectionInfo = pickSeveralDays(clickedDayInfo)
    }

    onSelect(selectionInfo)
  }

  const pickSingleDay = (clickedDayInfo: DateItem) => {
    setSelectedDay(
      selectedDay?.dayNumber === clickedDayInfo.dayNumber ? {} : clickedDayInfo
    )
    return clickedDayInfo
  }

  const pickSeveralDays = (clickedDayInfo: DateItem) => {
    // Todo: implement it later
    // const { start, end } = daysRange || {}
    // if (!start) return setDaysRange({ start: clickedDayInfo })
    // if (!end) return setDaysRange({ start, end: clickedDayInfo })
    // if (start?.dayNumber && end?.dayNumber)
    //   return setDaysRange({ start: clickedDayInfo })
  }

  return (
    <tr>
      {Object.entries(week).map(([dayInWeek, dayValue]) => (
        <td
          key={dayValue as number}
          onClick={() => handleDayClick(dayValue, +dayInWeek)}
          style={{
            color: applyDayTxtColor(+dayInWeek, dayValue),
            backgroundColor: applyBgColor(dayValue, +dayInWeek)
          }}
        >
          {dayValue}
        </td>
      ))}
    </tr>
  )
}
