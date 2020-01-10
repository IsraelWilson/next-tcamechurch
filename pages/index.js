import Meta from '../components/Meta.js'
import Home from '../pages/Home.js'
import Vote from '../pages/Vote.js'
import Confirm from '../pages/Confirm.js'
import Admin from '../pages/Admin.js'

export default class Index extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      page: <Home getPage={this.getPage.bind(this)}/>
    };
  }

  getPage(page, names = []) {
    if(page == "home") {
      this.setState({page: <Home getPage={this.getPage.bind(this)}/>});
    }

    if(page == "vote") {
      this.setState({page: <Vote getPage={this.getPage.bind(this)} selection={names}/>});
    }

    if(page == "confirm") {
      this.setState({page: <Confirm getPage={this.getPage.bind(this)} selection={names}/>});
    }

    if(page == "admin") {
      this.setState({page: <Admin getPage={this.getPage.bind(this)}/>});
    }

    this.setState({page: <Home getPage={this.getPage.bind(this)}/>});
  }

  render() {
    return (
      <div>
        <Meta/>
        {this.state.page}
      </div>
    );
  }
}
