export default function VoteRow(props) {
  return (
    <Row>
      <div>
        <label>{props.candidate.name}</label>
        <input name={props.candidate.name} type="checkbox" onChange={props.handleChange}/>
      </div>
      <style jsx>{`

        `}
      </style>
    </Row>
  )
}
