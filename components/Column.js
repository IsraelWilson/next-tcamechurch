export default function Column(props) {
  return (
    <div>
      {props.children}
      <style jsx>{`

        /* Desktop styles */
        div {
          display: flex;
          flex-direction: column;
          flex-basis: 22%;
          flex-grow: 1;
          flex-shrink: 0;
          justify-content: ${props.justify};
          align-items: ${props.align};
          margin: 1rem;
        }

        /* Tablet styles */
        @media (max-width: 900px) {
          div {
            display: flex;
            flex-direction: column;
            flex-basis: 47%;
            flex-grow: 1;
            flex-shrink: 0;
            justify-content: ${props.justify};
            align-items: ${props.align};
            margin: 1rem;
          }
        }

        /* Mobile styles */
        @media (max-width: 600px) {
          div {
            display: flex;
            flex-direction: column;
            flex-basis: 100%;
            flex-grow: 1;
            flex-shrink: 0;
            justify-content: ${props.justify};
            align-items: ${props.align};
            margin: 1rem;
            padding: 1rem;
          }
        }

      `}</style>
    </div>
  )
}
