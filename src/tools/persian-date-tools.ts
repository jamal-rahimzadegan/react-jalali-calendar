//@ts-nocheck
import jalaali, { JalaaliDateObject } from 'jalaali-js'
import { PERSIAN_MONTH } from '../constant'

class PersianDateTools {
  private readonly locale: 'fa' | 'en'
  private readonly todayDateIntl: Date
  private readonly todayDatePer: JalaaliDateObject
  private static instance: PersianDateTools

  private constructor() {
    this.locale = 'fa'
    this.todayDateIntl = new Date(Date.now())
    this.todayDatePer = jalaali.toJalaali(this.todayDateIntl)
  }

  static getSingletonInstance(): PersianDateTools {
    if (!PersianDateTools.instance)
      PersianDateTools.instance = new PersianDateTools()
    return PersianDateTools.instance
  }

  private grabDate(options: Intl.DateTimeFormatOptions): number | string {
    return this.todayDateIntl.toLocaleDateString(this.locale, options)
  }

  private convertToIntlDate = (
    year: number,
    month: number,
    day: number
  ): Date => {
    return jalaali.jalaaliToDateObject(year, month, day)
  }

  get currentDate(): CurrentDate {
    return {
      year: this.todayDatePer.jy,
      month: {
        number: this.todayDatePer.jm,
        name: this.grabDate({ month: 'long' })
      },
      day: {
        number: this.todayDatePer.jd,
        name: this.grabDate({ weekday: 'long' })
      }
    }
  }

  getMonthNameByNumber(num: number): string {
    return PERSIAN_MONTH[num - 1]
  }

  getMonthLength = (year: number, month: number): number => {
    return jalaali.jalaaliMonthLength(year, month)
  }

  getFirstDayOfMonth(year: number, month: number): number {
    return this.convertToIntlDate(year, month, 2).getDay()
  }

  isOnCurrentMonth(monthNumber: number): boolean {
    return (
      this.getMonthNameByNumber(monthNumber) === this.currentDate.month.name
    )
  }

  isToday(year: number, month: number, day: number): boolean {
    if (year !== this.currentDate.year) return false
    if (month !== this.currentDate.month.number) return false

    return day === this.todayDatePer.jd
  }

  isFriday(dayInWeek: number): boolean {
    // 6th day of the week in the persian calendar is Friday
    return dayInWeek === 6
  }
}

export default PersianDateTools.getSingletonInstance()
