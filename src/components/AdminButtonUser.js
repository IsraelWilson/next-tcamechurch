export default function AdminButtonUser(props) {
  return (
    <label>
      {props.user.user_id}
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
        `}
      </style>
    </label>
  )
}
