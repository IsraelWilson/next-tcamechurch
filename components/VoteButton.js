export default function VoteButton(props) {
  return (
    <label>
      {props.candidate.name}
      <input name={props.candidate.name} type="checkbox" onChange={props.handleChange}/>
      <span className="checkmark"></span>
      <style jsx>{`
        label {
          display: block;
          position: relative;
          padding-left: 4rem;
          margin-bottom: 12px;
          cursor: pointer;
          font-size: 2.5rem;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 2.5rem;
          width: 2.5rem;
          background-color: #eee;
        }

        input:hover ~ .checkmark {
          background-color: #ccc;
        }

        input:checked ~ .checkmark {
          background-color: #2196F3;
        }

        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }

        input:checked ~ .checkmark:after {
          display: block;
        }

        .checkmark:after {
          left: 9px;
          top: 5px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 1rem 1rem 0;
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        `}
      </style>
    </label>
  )
}
