// @ts-nocheck
import React, { Fragment, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import Header from './components/header/Header'
import CalenderContext from './lib/calender-context'
import RenderDays from './components/RenderDays'
import perDate from './tools/persian-date-tools'
import { WEEK_DAYS } from './constant'
import { generateArr } from './utils'
import styles from './lib/style.module.css'
import { COLORS } from './theme/colors'
import './assets/styles/index.css'
import { GlobalStyle } from 'assets/styles/global-style'

interface Props {
  onSelect: (day: DateItem) => void
  style?: StyleObject
  className?: string
}

export function Calendar(props: Props): JSX.Element {
  const { onSelect, style, className = '' } = props
  const { currentDate } = perDate
  const [year, setYear] = useState<number>(currentDate.year)
  const [month, setMonth] = useState<number>(currentDate.month.number)
  const [selectedDay, setSelectedDay] = useState<DateItem>({})
  const [daysRange, setDaysRange] = useState<DayRange>({})
  const selectMethod: DaySelectType = 'single'
  const monthLength: number = perDate.getMonthLength(year, month)
  const firstDayOfMonth: number = perDate.getFirstDayOfMonth(year, month)
  const calenderRowWeek = firstDayOfMonth > 4 ? 6 : 5 // 4 === Wednesday

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
    lookAndFeel: style
  }

  useEffect(resetSelectedDay, [month, year])

  return (
    <ThemeProvider theme={COLORS}>
      <GlobalStyle />
      <CalenderContext.Provider value={sharedItems}>
        <Header />
        <div className={styles.calender + ' ' + className}>
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
    </ThemeProvider>
  )
}
