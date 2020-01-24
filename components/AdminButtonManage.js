export default function AdminButtonManage(props) {
  return (
    <div>
      <label>{props.candidate.name}</label>
      <button name={props.candidate.name} onClick={props.click}>X</button>
      <style jsx>{`
        div {
          display: flex;
          justify-content: space-between;
        }

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

        button {
          border: none;
          padding: 1rem 2rem;
          margin-left: 0.25rem;
          margin-bottom: 1.5rem;
          text-decoration: none;
          background: #ff3333;
          color: #232323;
          font-family: "Roboto", sans-serif;
          font-size: 2.5rem;
          cursor: pointer;
          text-align: center;
          transition: background 250ms ease-in-out,
                      transform 150ms ease;
          -webkit-appearance: none;
          -moz-appearance: none;
        }

        button:hover,
        button:focus {
          background: #d6a206;
        }

        button:focus {
          outline: 1px solid #fff;
          outline-offset: -4px;
        }

        button:active {
          transform: scale(0.99);
        }
        `}
      </style>
    </div>
  )
}
