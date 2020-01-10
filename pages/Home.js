import React from 'react'
import Container from '../components/Container.js'

export default class Home extends React.Component {
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

  render() {
    return (
      <Container>
          <input />
          <button>Hello</button>
        <style jsx>{`

        `}</style>
      </Container>
    );
  }
}
