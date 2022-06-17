import React from 'react'
import { Calendar } from 'react-jalali-calendar'
import 'react-jalali-calendar/dist/index.css'

export default function App() {
  return (
    <Calendar
      onSelect={console.table}
      // customHeader={(props) => {
      //   console.log(`--- props.updateMonth ----> `, props)
      //
      //   return (
      //     <div
      //       style={{
      //         background: 'red',
      //         display: 'flex',
      //         justifyContent: 'space-between',
      //         width: '100%'
      //       }}
      //     >
      //       <p onClick={() => props.gotToNextMonth()}>بعدی</p>
      //       {props.activeDate.year} {props.activeDate.month}
      //       <p onClick={() => props.gotToPrevMonth()}>قبلی</p>
      //     </div>
      //   )
      // }}
    />
  )
}
