import React from 'react'
import Container from '../components/Container.js'

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      live: false,
      candidates: []
    };
  }

  tally = () => {
    fetch('/tally')
    .then((res) => res.json())
    .then((res) => { console.log(res) })
    .catch((err) => { console.log(err) })
  }

  componentDidMount = () => {
    this.tally()
  }

  render = () => {
    return (
      <Container>
        <input />
        <button>Admin</button>
        <style jsx>{`

        `}</style>
      </Container>
    );
  }
}
