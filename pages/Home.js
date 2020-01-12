import React from 'react'
import Container from '../components/Container.js'
import fetch from 'isomorphic-unfetch'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      live: false,
      candidates: [],
      userID: ""
    };
  }

  login = () => {
    const userID = this.state.userID;

    if(userID == ""){
      return;
    }

    if(userID == "tccadmin") {
      this.props.getPage("admin");
    }

    fetch('/access/' + userID)
    .then((res) => res.json())
    .then((res) => {
      if(res.length > 0) {
        console.log("res len > 0");
        if(res[0].voted == 0) {
          console.log("voted == 0");
          this.props.getPage("vote");
        } else {
          // User already voted
          console.log("user voted");
        }
      } else {
        // Handle failed login attempt
        console.log("failed to login");

      }
    })
    .catch((err) => {
      console.log('Login error: ', err);
    })

  }

  change = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({[name]: value});
  }

  render = () => {
    return (
      <Container>
        <form onClick={this.login}>
          <input type="text" name="userID" value={this.state.userID} onChange={this.change}/>
          <button type="button">Sign In</button>
        </form>
        <style jsx>{`

        `}</style>
      </Container>
    );
  }
}
