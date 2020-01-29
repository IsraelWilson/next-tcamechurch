export default function AdminButtonTally(props) {
  return (
    <div>
      <label>{props.candidate.name}</label><label>{props.candidate.votes}</label>
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
    </div>
  )
}
