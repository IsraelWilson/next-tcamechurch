import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Row from './Row'

export default function Poll(props) {
  return (
    <Row>
      <h3>{props.name}</h3>
      <button type="button" onClick={props.view}>VIEW</button>
      <button type="button" onClick={props.del}>DELETE</button>
      <style jsx>{`
        `}</style>
    </Row>
  )
}
