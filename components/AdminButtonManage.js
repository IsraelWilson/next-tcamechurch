export default function AdminButtonManage(props) {
  return (
    <div>
      <label>{props.candidate.name}</label>
      <button onClick={props.click}>X</button>
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
