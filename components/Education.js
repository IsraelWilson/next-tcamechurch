import Column from '../components/Column.js'

export default function Education(props) {
  return (
    <Column>
      <span>
        <h4>{props.date}</h4>
        <h1>{props.school}</h1>
        <h3>{props.degree}</h3>
      </span>
        <style jsx>{`
          h4 {
            font-size: 4rem;
            margin-bottom: 2.5rem;
          }

          h1 {
            margin-bottom: 1.5rem;
            color: #feda6a;
          }

          h3 {
            font-size: 2rem;
            margin-bottom: 2.5rem;
          }

          span {
            text-align: center;
          }
        `}</style>
    </Column>
  )
}
