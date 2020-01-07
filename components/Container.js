import React from 'react'
import Row from '../components/Row.js'
import Column from '../components/Column.js'
import ColumnBasis from '../components/ColumnBasis.js'

export default function Container(props) {
  return (
    <div>

      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
      `}</style>
    </div>
  )
}
