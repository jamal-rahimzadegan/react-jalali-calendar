import React, { Fragment } from 'react'
import { WEEK_DAYS } from '../../constant'
import RenderDays from './RenderDays'
import styles from './styles.css'

interface Props {
  calenderWeekList: Week[]
}

export default function DaysBox(props: Props): JSX.Element {
  const { calenderWeekList } = props

  return (
    <table className={styles.calendarDayContainer}>
      <thead>
        <tr>
          {Object.values(WEEK_DAYS).map((dayItem) => (
            <td key={dayItem} className={styles.calendarDays}>
              {dayItem}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {calenderWeekList.map((week, i) => (
          <Fragment key={i + Math.random()}>
            <RenderDays week={week} />
          </Fragment>
        ))}
      </tbody>
    </table>
  )
}
