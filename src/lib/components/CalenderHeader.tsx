import React, { useContext } from 'react'
import perDate from '../persian-date-tools'
import CalenderContext from '../calender-context'
import styles from '../style.module.css'

export default function CalenderHeader() {
  const { year, month, setMonth, setYear, style } = useContext(CalenderContext)

  const changeMonth = (action: MontSwitchType) => {
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

  return (
    <div className={styles.calender__header}>
      <button
        style={{
          color: style.headTitleColor,
          background: style.headBtnColor
        }}
        onClick={() => changeMonth('prev')}
        children='‹'
      />
      <p
        style={{
          color: style.headTitleColor
        }}
      >
        {perDate.getMonthNameByNumber(month)} {year}
      </p>
      <button
        style={{
          color: style.headTitleColor,
          background: style.headBtnColor
        }}
        onClick={() => changeMonth('next')}
        children='›'
      />
    </div>
  )
}
