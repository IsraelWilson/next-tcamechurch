import Column from '../components/Column.js'

export default function Position(props) {
  return (
    <Column>
      <h1>{props.title}</h1>
      <p>{props.desc}</p>
      <span>
        <h3>{props.date}</h3>
        <h3>{props.company}</h3>
      </span>
      <style jsx>{`
        h1 {
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }

        p {
          line-height: 1.25;
          margin-bottom: 2rem;
          flex-grow: 1;
          font-size: 1rem;
        }

        span {
          display: flex;
          justify-content: space-between;
        }

        h3 {
          font-size: 1rem;
        }

        h3:last-child {
          color: #feda6a;
        }

      `}</style>
    </Column>
  )
}
