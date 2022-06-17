import React, { useContext } from 'react'
import CalenderContext from '../../lib/calender-context'
import { COLORS, WEEK_DAYS } from '../../constant'
import perDate from '../../tools/persian-date-tools'
import styles from './styles.css'

interface Props {
  week: Week
}

export default function RenderDays(props: Props) {
  const { week } = props
  const { year, month, selectMethod, selectedDay, setSelectedDay, onSelect } =
    useContext(CalenderContext)

  const checkIfSelectedDay = (dayValue: number): boolean => {
    if (!dayValue) return false
    return selectedDay?.dayNumber === dayValue
  }

  const applyDayTxtColor = (dayInWeek: number, dayValue: number): string => {
    if (perDate.isToday(year, month, dayValue)) return COLORS.TXT
    if (checkIfSelectedDay(dayValue)) return COLORS.TXT
    if (perDate.isFriday(dayInWeek)) return COLORS.HOLIDAY_TXT
    else return COLORS.TXT
  }

  const applyDyBgColor = (dayValue: number, dayInWeek: number): string => {
    const { HOLIDAY_BG, TODAY_BG, TRANSPARENT, NORMAL_DAY_BG, ACCENT } = COLORS

    if (!dayValue) return TRANSPARENT
    if (checkIfSelectedDay(dayValue)) return ACCENT
    if (perDate.isToday(year, month, dayValue)) return TODAY_BG
    if (perDate.isFriday(+dayInWeek)) return HOLIDAY_BG

    return NORMAL_DAY_BG
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
      {Object.entries(week).map(([dayInWeek, dayValue], i) => (
        <td
          key={dayValue || dayInWeek + `${i}`}
          onClick={() => handleDayClick(dayValue, +dayInWeek)}
          className={styles.calendarDayNumber}
          style={{
            color: applyDayTxtColor(+dayInWeek, dayValue),
            backgroundColor: applyDyBgColor(dayValue, +dayInWeek)
          }}
        >
          {dayValue}
        </td>
      ))}
    </tr>
  )
}
