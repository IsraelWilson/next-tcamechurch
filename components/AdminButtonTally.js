export default function AdminButtonTally(props) {
  return (
    <div>
        <label>{props.candidate.name}</label>
        <div className="col">
      </div>
      <div className="col">
        <label>{props.candidate.votes}</label>
      </div>
      <style jsx>{`
        div {
          display: flex;
        }

        .col {
          display: flex;
          flex-direction: column;
          padding: 1rem;
        }

        label {
          display: block;
          position: relative;
          cursor: pointer;
          font-size: 1.5rem;
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
