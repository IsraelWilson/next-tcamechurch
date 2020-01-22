import React from 'react'
import Container from '../components/Container.js'
import Row from '../components/Row'
import Column from '../components/Column'

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      live: false,
      candidates: [],
      name: ""
    };
  }

  componentDidMount = () => {
    this.tally()
  }

  tally = () => {
    fetch('/tally')
    .then((res) => res.json())
    .then((res) => {
      this.setState({candidates: res});
    })
    .catch((err) => { console.log(err) })
  }

  getTallyButtons = (candidates) => {
    let buttons = [];
    candidates.map((candidate) => buttons.push(<button type="button">{candidate.trustee_name}: <label>{candidate.vote_num}</label></button>));
    return buttons;
  }

  getColumn = (buttonArr) => {
    return <Column>{buttonArr}</Column>;
  }

  getColumns = (candidates, type) => {
    let buttons = [];
    if(type == "tally") {
      buttons = this.getTallyButtons(candidates);
    }

    if(type == "manage") {
      buttons = this.getManageButtons(candidates);
    }

    let column = [];
    let columns = [];

    for(let i = 0; i < buttons.length; i++) {
      column.push(buttons[i]);
      if(i % 10 == 0 && i != 0 || i == buttons.length - 1) {
        columns.push(this.getColumn(column));
        column = [];
      }
    }

    return columns;
  }

  getTallyRow = (candidates) => {
    return <Row>{this.getColumns(candidates, "tally")}</Row>;
  }

  getManageButtons = (candidates) => {
    let buttons = [];
    candidates.map((candidate) => buttons.push(<div>{candidate.trustee_name}: <button>X</button></div>));
    return buttons;
  }

  getManageRow = (candidates) => {
    return <Row>{this.getColumns(candidates, "manage")}</Row>
  }

  handleName = () => {

  }

  render = () => {
    return (
      <Container>
        <h1>Results</h1>
        {this.getTallyRow(this.state.candidates)}
        <h1>Manage</h1>
        {this.getManageRow(this.state.candidates)}
        <form onClick={this.login.bind(this)}>
          <Row>
            <input type="text" name="add" value={this.state.name} onChange={this.handleName}/>
            <button type="button">Add Candidate</button>
          </Row>
        </form>
        <style jsx>{`

        `}</style>
      </Container>
    );
  }
}
