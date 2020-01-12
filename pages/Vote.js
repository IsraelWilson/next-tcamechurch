import React from 'react'
import Container from '../components/Container.js'

export default class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render = () => {
    return (
      <Container>
        <input />
        <button>Vote</button>
        <style jsx>{`

        `}</style>
      </Container>
    );
  }
}
