export default function Container(props) {
  return (
    <div>
      {props.children}
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
      `}</style>
    </div>
  )
}
