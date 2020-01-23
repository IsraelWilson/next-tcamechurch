export default function ConfirmButton(props) {
  return (
    <div>
      <label>{props.name}</label>
      <style jsx>{`
        div {
          display: flex;
          justify-content: center;
        }
        `}
      </style>
    </div>
  )
}
