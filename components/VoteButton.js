export default function VoteButton(props) {
  return (
    <>
      <div>
        <label>{props.candidate.name}</label>
        <input name={props.candidate.name} type="checkbox" onChange={props.handleChange}/>
      </div>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: row;
          flex-grow: 1;
          justify-content: center;
        }
        `}
      </style>
    </>
  )
}
