import React from 'react'
import { Calendar } from 'react-jalali-calendar'
import 'react-jalali-calendar/dist/index.css'

export default function App() {
  return (
    <Calendar
      onSelect={console.table}
      style={{
        // fontFamily: 'arial',
        colors: {
          headBorderColor: 'red',
          headTitleColor: 'blue',
          headBtnColor: 'red'
          //
          // weekDayNameColor: 'blue',
          // weekDayNameBg: 'navy',
          //
          // todayBg: 'yellow',
          // todayTxtColor: 'red',
          //
          // holidayBg: 'red',
          // holidayText: 'white',
          //
          // currentDayBg: 'lime',
          // currentDayText: 'blue',
          //
          // dayBgColor: 'brown',
          // dayTextColor: 'blue'
        }
      }}
    />
  )
}
