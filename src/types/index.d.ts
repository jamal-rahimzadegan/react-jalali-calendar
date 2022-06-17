type MonthSwitchType = 'prev' | 'next'

type DaySelectType = 'single' | 'range'

interface DateItem {
  year?: number
  month?: number
  dayNumber?: number
  dayLabel?: string
}

interface DayRange {
  start?: DateItem
  end?: DateItem
}

interface CurrentDate {
  year: number
  month: {
    number: number
    name: string
  }
  day: { number: number; name: string }
}

type Week = {
  [K in 0 | 1 | 2 | 3 | 4 | 5 | 6]?: number
}
