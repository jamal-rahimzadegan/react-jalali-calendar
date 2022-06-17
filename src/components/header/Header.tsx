import React, { useContext } from 'react'
import CalenderContext from 'lib/calender-context'
import styles from './styles.css'

export default function Header(): JSX.Element {
  const { changeMonth, currentYear, currentMonth } = useContext(CalenderContext)

  return (
    <header className={styles.calendar__header}>
      <button onClick={() => changeMonth('prev')} children='‹' />
      <p>
        {currentMonth} - {currentYear}
      </p>
      <button onClick={() => changeMonth('next')} children='›' />
    </header>
  )
}
