export default function AdminButtonUser(props) {
  return (
    <div>
      <label>{props.user.user_id}</label>
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
