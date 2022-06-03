import React from 'react'
import { Calendar } from 'react-jalali-calendar'
import 'react-jalali-calendar/dist/index.css'

export default function App() {
  return (
    <Calendar
      onSelect={console.table}
      style={{
        headTitleColor: 'orange',
        headBtnColor: 'red',

        weekDayNameColor: 'blue',
        weekDayNameBg: 'navy',

        todayBg: 'yellow',
        todayTxtColor: 'red',

        holidayBg: 'red',
        holidayText: 'white',

        currentDayBg: 'lime',
        currentDayText: 'blue'
      }}
    />
  )
}
