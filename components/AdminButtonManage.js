export default function AdminButtonManage(props) {
  return (
    <div>
      <label>{props.candidate.name}</label>
      <button>X</button>
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
