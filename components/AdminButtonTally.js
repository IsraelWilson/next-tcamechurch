export default function AdminButtonTally(props) {
  return (
    <div>
      <div className="colN">
        <label>{props.candidate.name}</label>
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
          flex-basis: 75%;
        }

        .colV {
          display: flex;
          flex-direction: column;
          flex-basis: 25%;
          padding-right: 1rem;
        }

        label {
          display: block;
          position: relative;
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
