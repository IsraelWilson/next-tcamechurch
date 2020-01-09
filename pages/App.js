import Container from '../components/Container.js'
import Meta from '../components/Meta.js'

export default class App extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      page: <Index />,
      voterPage: <Select />
    };
  }

  render() {
    return (
      <div>
        <Meta/>
      </div>
    );
  }
}
