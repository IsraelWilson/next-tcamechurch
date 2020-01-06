export default function ColumnBasis(props) {
  return (
    <div>
      {props.children}
      <style jsx>{`

        /* Desktop styles*/
        div {
          display: flex;
          flex-direction: column;
          flex-basis: 75%;
        }

        /* Tablet styles*/
        @media (max-width: 900px) {
          div {
            display: flex;
            flex-direction: column;
            flex-basis: 75%;
          }
        }

        /* Mobile styles*/
        @media (max-width: 600px) {
          div {
            display: flex;
            flex-direction: column;
            flex-basis: 100%;
          }
        }

      `}</style>
    </div>
  )
}
