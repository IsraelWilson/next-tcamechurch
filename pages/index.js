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
      page: <Home getPage={this.getPage.bind(this)}/>
    };
  }

  getPage = (page, names = []) => {
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
  }

  render = () => {
    return (
      <div>
        <Meta/>
        {this.state.page}
      </div>
    );
  }
}
