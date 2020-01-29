export default function AdminButtonTally(props) {
  return (
    <div>
        <label>{props.candidate.name}</label>
        <div className="name">
      </div>
      <div className="vote">
        <label>{props.candidate.votes}</label>
      </div>
      <style jsx>{`
        div {
          display: flex;
        }

        .name {
          display: flex;
          flex-direction: column;
          padding: 1rem;
        }

        .vote {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
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
