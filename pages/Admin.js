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
    .then((res) => {
      let update = [];
      res.map((candidate) => update.push(<button>{candidate.trustee_name} {candidate.vote_num} </button>));
      this.setState({candidates: update});
    })
    .catch((err) => { console.log(err) })
  }

  componentDidMount = () => {
    this.tally()
    console.log(this.state.candidates)
  }

  render = () => {
    return (
      <Container>
        <input />
        {this.state.candidates}
        <style jsx>{`

        `}</style>
      </Container>
    );
  }
}
