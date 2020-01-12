import React from 'react'
import Meta from '../components/Meta.js'
import Admin from './Admin.js'
import Home from './Home.js'
import Vote from './Vote.js'
import Confirm from './Confirm.js'

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: <Home getPage={this.getPage}/>
    };

    this.getPage = this.getPage.bind(this);
  }

  getPage(page, names = []) {
    if(page == "home") {
      this.setState({page: <Home getPage={this.getPage}/>});
    }

    if(page == "vote") {
      console.log("Going to vote page");
      this.setState({page: <Vote getPage={this.getPage} selection={names}/>});
    }

    if(page == "confirm") {
      this.setState({page: <Confirm getPage={this.getPage} selection={names}/>});
    }

    if(page == "admin") {
      this.setState({page: <Admin getPage={this.getPage}/>});
    }

    this.setState({page: <Home getPage={this.getPage}/>});
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
