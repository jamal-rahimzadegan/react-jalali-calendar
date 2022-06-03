// @ts-nocheck
import React, { Fragment, useEffect, useState } from 'react'
import CalenderHeader from './lib/components/CalenderHeader'
import CalenderContext from './lib/calender-context'
import RenderDays from './lib/components/RenderDays'
import perDate from './lib/persian-date-tools'
import { WEEK_DAYS } from './lib/constants'
import { generateArr } from './lib/utils'
import styles from './lib/style.module.css'

interface Props {
  onSelect: (day: DateItem) => void
  style?: StyleObject
}

export function Calendar(props: Props): JSX.Element {
  const { onSelect, style } = props
  const { currentDate } = perDate
  const [year, setYear] = useState<number>(currentDate.year)
  const [month, setMonth] = useState<number>(currentDate.month.number)
  const [selectedDay, setSelectedDay] = useState<DateItem>({})
  const [daysRange, setDaysRange] = useState<DayRange>({})
  const selectMethod: DaySelectType = 'single'
  const monthLength: number = perDate.getMonthLength(year, month)
  const firstDayOfMonth: number = perDate.getFirstDayOfMonth(year, month)
  const calenderRowWeek = firstDayOfMonth > 4 ? 6 : 5 // 0: Saturday, 6: Friday

  const generateCalenderWeeks = (): (() => Week[]) => {
    let currentDay: number = 1

    const getDayValue = (weekDayNumber: number, i: number): number => {
      if (currentDay > monthLength) return
      if (i !== 0) return currentDay++
      if (i === 0 && weekDayNumber >= firstDayOfMonth) return currentDay++
    }

    const createWeekData = (i) => {
      const data = {}
      generateArr(7).forEach((item, j) => (data[j] = getDayValue(j, i)))
      return data
    }

    return () =>
      generateArr(calenderRowWeek).map((item: Week, i) => createWeekData(i))
  }

  const calenderWeekList = generateCalenderWeeks()

  const resetSelectedDay = () => selectMethod === 'single' && setSelectedDay({})

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
    style
  }

  useEffect(resetSelectedDay, [month, year])

  return (
    <CalenderContext.Provider value={sharedItems}>
      <CalenderHeader />
      <div className={styles.calender}>
        <table>
          <thead>
            <tr
              style={{
                color: style.weekDayNameColor,
                background: style.weekDayNameBg || 'transparent'
              }}
            >
              {Object.values(WEEK_DAYS).map((dayItem) => (
                <td key={dayItem}>{dayItem}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {calenderWeekList().map((week, i) => (
              <Fragment key={i + Math.random()}>
                <RenderDays week={week} />
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </CalenderContext.Provider>
  )
}
