export default function ConfirmButton(props) {
  return (
    <>
      <div>
        <label>{props.name}</label>
      </div>
      <style jsx>{`
        div {
          display: flex;
          justify-content: center;
        }
        `}
      </style>
    </>
  )
}
