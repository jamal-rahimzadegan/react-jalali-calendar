type MontSwitchType = 'prev' | 'next'

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

interface StyleObject {
  headTitleColor?: string
  headBtnColor?: string
  headBorderColor?: string
  weekDayNameColor?: string
  weekDayNameBg?: string
  dayBgColor?: string
  dayTextColor?: string
  currentDayText?: string
  currentDayBg?: string
  todayBg?: string
  todayTxtColor?: string
  holidayText?: string
  holidayBg?: string
}

interface Week {
  [key: number]: number

  // @ts-ignore
  [key: number]: number
  // @ts-ignore

  [key: number]: number
  // @ts-ignore

  [key: number]: number
  // @ts-ignore

  [key: number]: number
  // @ts-ignore

  [key: number]: number
  // @ts-ignore

  [key: number]: number
}
