export default function AdminButtonTally(props) {
  return (
    <div>
        <label>{props.candidate.name}</label>
        <div className="colN">
      </div>
      <div className="colV">
        <label>{props.candidate.votes}</label>
      </div>
      <style jsx>{`
        div {
          display: flex;
          justify-content: space-between;
        }

        .colN {
          display: flex;
          flex-direction: column;
          flex-grow: 3;
        }

        .colV {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
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
