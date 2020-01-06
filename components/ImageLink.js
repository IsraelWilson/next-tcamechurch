import Column from '../components/Column.js'

export default function ImageLink(props) {
  return (
    <Column align="center">
      <a href={props.href}>
        <img src={props.src}/>
      </a>
      <style jsx>{`
        a {

        }
      `}</style>
    </Column>
  )
}
