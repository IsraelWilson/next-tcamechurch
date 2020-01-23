export default function VoteButton(props) {
  return (
    <>
      <div>
        <label>{props.candidate.name}</label>
        <input name={props.candidate.name} type="checkbox" onChange={props.handleChange}/>
      </div>
      <style jsx>{`
        div {

        }

        label {
          margin-right: 2rem;
        }
        `}
      </style>
    </>
  )
}
