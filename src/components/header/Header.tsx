import React, { useContext } from 'react'
import CalenderContext from 'lib/calender-context'
import { StyledHeader } from './styles'
import { perDate } from 'tools'

export default function Header() {
  const { year, month, setMonth, setYear, lookAndFeel } =
    useContext(CalenderContext)

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
    <StyledHeader lookAndFeel={lookAndFeel}>
      <button onClick={() => changeMonth('prev')} children='‹' />
      <p>
        {perDate.getMonthNameByNumber(month)} {year}
      </p>
      <button onClick={() => changeMonth('next')} children='›' />
    </StyledHeader>
  )
}
