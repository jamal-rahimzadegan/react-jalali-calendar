import { Context, createContext } from 'react'

interface CalenderSharedItems {
  year?: number
  setYear: Function
  month?: number
  setMonth: Function
  selectedDay?: DateItem
  daysRange?: DayRange
  setDaysRange?: Function
  setSelectedDay?: Function
  selectMethod?: DaySelectType
  onSelect?: (day: DateItem) => void
  changeMonth: (action: MonthSwitchType) => void
  currentMonth: string
  currentYear: string
}

// @ts-ignore
const CalenderContext: Context<CalenderSharedItems> = createContext({})
export default CalenderContext
