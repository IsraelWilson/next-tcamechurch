import Container from '../components/Container.js'
import Meta from '../components/Meta.js'

export default class Index extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      live: false,
      candidates: []
    };
  }

  hasAccess() {

  }

  login() {

  }

  return (
    <div>
      <Meta/>
      <Container/>
      <input>
      <button></button>
      <style jsx>{`

      `}</style>
    </div>
  )
}
