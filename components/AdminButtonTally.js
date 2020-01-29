import Row from 'Row'
import Column from 'Column'

export default function AdminButtonTally(props) {
  return (
    <Row>
      <Column>
        <label>{props.candidate.name}</label>
      </Column>
      <Column>
        <label>{props.candidate.votes}</label>
      </Column>
      <style jsx>{`
        div {
          display: flex;
          justify-content: space-between;
        }

        label {
          display: block;
          position: relative;
          margin-bottom: 12px;
          cursor: pointer;
          font-size: 2.5rem;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        `}
      </style>
    </Row>
  )
}
