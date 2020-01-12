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

  getTally = () => {
    fetch('/tally')
    .then((res) => res.json())
    .then((res) => { console.log(res) })
    .catch((err) => { console.log(err) })
  }

  componentDidMount = () => {
    getTally()
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
