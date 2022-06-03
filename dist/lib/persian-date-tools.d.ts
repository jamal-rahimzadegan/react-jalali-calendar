declare class PersianDateTools {
    private readonly locale;
    private readonly todayDateIntl;
    private readonly todayDatePer;
    private static instance;
    private constructor();
    static getSingletonInstance(): PersianDateTools;
    private grabDate;
    private convertToIntlDate;
    get currentDate(): CurrentDate;
    getMonthNameByNumber(num: number): string;
    getMonthLength: (year: number, month: number) => number;
    getFirstDayOfMonth(year: number, month: number): number;
    isOnCurrentMonth(monthNumber: number): boolean;
    isToday(year: number, month: number, day: number): boolean;
    isFriday(dayInWeek: number): boolean;
}
declare const _default: PersianDateTools;
export default _default;
