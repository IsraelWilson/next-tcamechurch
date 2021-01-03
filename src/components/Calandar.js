import React, { useState, useEffect } from 'react'
import moment from 'moment'

export default function Calandar(props) {
  const [calendar, setCalendar] = useState([])

  useEffect(() => {
    setCalendar(() => initCalendar(moment().format("MMMM YYYY")))
  }, [])

  function initCalendar(date) {
    const newCal = []
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

    console.log("initCalendar", newCal)
    setCalendar(newCal)
  }

  function buildCell(num) {
    return <span>{num}</span>
  }

  function buildRow(cells) {
    return <div>{cells}</div>
  }

  function renderCalendar() {
    let cells = []
    const rows = []
    const newCal = calendar
    console.log("renderCalendar", calendar)

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
    <>{renderCalendar()}</>
  )
}
