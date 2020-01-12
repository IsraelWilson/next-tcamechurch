import React from 'react'
import Container from '../components/Container.js'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      live: false,
      candidates: [],
      userID: ""
    };
  }

  hasAccess() {

  }

  login() {
    if(this.state.userID == ""){
      return;
    }
    const userID = this.state.userID;

    fetch('/access/' + userID, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: userID
      })
    })
    .then((res) => res.text())
    .then((res) => {
      console.log('Contact form response: ', res);
    })
    .catch((err) => {
      console.log('Contact form error: ', err);
    })

  }

  change(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({[name]: value});
  }

  render() {
    return (
      <Container>
        <form onClick={login.bind(this)}>
          <input type="text" name="userID" value={this.state.userID} onChange={change.bind(this)}/>
          <button type="button">Sign In</button>
        </form>
        <style jsx>{`

        `}</style>
      </Container>
    );
  }
}
