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
          justify-content: space-between;
          padding-right: 2rem;
        }
        `}
      </style>
    </>
  )
}
