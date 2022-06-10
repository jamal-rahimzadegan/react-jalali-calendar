import { Context } from 'react';
interface CalenderSharedItems {
    year?: number;
    setYear: Function;
    month?: number;
    setMonth: Function;
    selectedDay?: DateItem;
    daysRange?: DayRange;
    setDaysRange?: Function;
    setSelectedDay?: Function;
    selectMethod?: DaySelectType;
    onSelect?: (day: DateItem) => void;
    lookAndFeel: StyleObject;
}
declare const CalenderContext: Context<CalenderSharedItems>;
export default CalenderContext;
