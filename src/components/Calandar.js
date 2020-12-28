import React from 'react'
import moment from 'moment'

export default function Calandar(props) {
  const now = moment()
  const numDays = now.daysInMonth()
  const lastMonthDays = now.subtract(1, 'month').daysInMonth()
  const nextMonthDays = now.add(1, 'month').daysInMonth()
  console.log(now)
  const calandar = []

  function buildCalendar() {
    let offset = Math.floor((42 - numDays) / 2)
    for(let i = 0; i < 42; i++) {}
  }

  return (
    <>
    <div>{lastMonthDays}</div>
    <div>{now.daysInMonth()}</div>
    <div>{nextMonthDays}</div>
    </>
  )
}
