export default function AdminButtonTally(props) {
  return (
    <div>
      <label>{props.candidate.name}</label>: <label>{props.candidate.votes}</label>
      <style jsx>{`
        div {
          display: flex;
          justify-content: space-between;
        }
        `}
      </style>
    </div>
  )
}
