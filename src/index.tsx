import React, { useEffect, useState } from 'react'
import CalenderContext from './lib/calender-context'
import perDate from './tools/persian-date-tools'
import DaysBox from './components/days/DaysBox'
import Header from './components/header/Header'
import { generateArr } from './utils'
import './assets/styles/index.css'
import { numberTools } from './tools'

interface HeaderProps {
  gotToNextMonth: Function
  gotToPrevMonth: Function
  activeDate: {
    month: string
    year: string
  }
}

interface Props {
  onSelect: (day: DateItem) => void
  customHeader?: (headerProps) => JSX.Element
}

export function Calendar(props: Props): JSX.Element {
  const { onSelect, customHeader } = props
  const { currentDate } = perDate
  const [year, setYear] = useState<number>(currentDate.year)
  const [month, setMonth] = useState<number>(currentDate.month.number)
  const [selectedDay, setSelectedDay] = useState<DateItem>({})
  const [daysRange, setDaysRange] = useState<DayRange>({})
  const selectMethod: DaySelectType = 'single'
  const monthLength: number = perDate.getMonthLength(year, month)
  const firstDayOfMonth: number = perDate.getFirstDayOfMonth(year, month)
  const numberOfRows: 5 | 6 = firstDayOfMonth > 4 ? 6 : 5 // 4 === Wednesday

  const generateCalenderWeeks = (): (() => Week[]) => {
    let currentDay: number = 1

    const createWeekData = (i) => {
      const data = {}
      generateArr(7).forEach((item, j) => (data[j] = getDayValue(j, i)))
      return data
    }

    const getDayValue = (weekDayNumber: number, i: number): number => {
      if (currentDay > monthLength) return
      if (i !== 0) return currentDay++
      if (i === 0 && weekDayNumber >= firstDayOfMonth) return currentDay++
    }

    return () => {
      return generateArr(numberOfRows).map((item: Week, i) => createWeekData(i))
    }
  }

  const calenderWeekList = generateCalenderWeeks()

  const resetSelectedDay = () => selectMethod === 'single' && setSelectedDay({})

  const changeMonth = (action: MonthSwitchType) => {
    if (action === 'prev') {
      if (month >= 2) return setMonth(month - 1)
      else {
        setYear(year - 1)
        setMonth(12)
      }
    }

    if (action === 'next') {
      if (month <= 11) return setMonth(month + 1)
      else {
        setYear(year + 1)
        setMonth(1)
      }
    }
  }

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
  }

  const headerProps: HeaderProps = {
    gotToNextMonth: () => changeMonth('next'),
    gotToPrevMonth: () => changeMonth('prev'),
    activeDate: {
      month: sharedItems.currentMonth,
      year: sharedItems.currentYear
    }
  }

  useEffect(resetSelectedDay, [month, year])

  return (
    <CalenderContext.Provider value={sharedItems}>
      {customHeader ? customHeader(headerProps) : <Header />}
      <DaysBox calenderWeekList={calenderWeekList()} />
    </CalenderContext.Provider>
  )
}
