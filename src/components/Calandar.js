import React from 'react'
import moment from 'moment'

export default function Calandar(props) {
  const [calendar, setCalendar] = useState([])

  useEffect(() => {
    setCalendar(initCalendar(moment().format("MMMM YYYY")))
  })

  function initCalendar(date) {
    const newCal = calendar
    const numDays = moment(date).daysInMonth()
    const offset = Math.floor((42 - numDays) / 2)

    const daysInLastMonth = moment(date).daysInMonth()
    for(let i = daysInLastMonth - offset + 1; i <= daysInLastMonth; i++) {
      newCal.push(i)
    }

    for(let i = 1; i <= numDays; i++) {
      newCal.push(i)
    }

    for(let i = 1; i <= (numDays % 2 ? offset : offset + 1); i++) {
      newCal.push(i)
    }

    setCalendar(newCal)
  }

  function buildCell(num) {
    return <span>{num}</span>
  }

  function buildRow(cells) {
    return <div>{cells}</div>
  }

  function renderCalendar() {
    const cells = []
    const rows = []
    const newCal = calendar

    for(let i = 0; i < newCal.length; i++) {
      if(7 % i === 0 && i !== 0) {
        rows.push(buildRow(cells))
        cells = []
      }
      cells.push(buildCell(newCal[i]))
    }
    return rows
  }

  return (
    <>
      <div>{renderCalendar()}</div>
    </>
  )
}
