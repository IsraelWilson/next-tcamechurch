import React from 'react'
import Container from '../components/Container.js'
import Row from '../components/Row'
import Column from '../components/Column'

export default class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: []
    };
  }

  getButtons = (candidates) => {
    let buttons = [];
    if(candidates) candidates.map((candidate) => buttons.push(<button type="button">{candidate}</button>));
    return buttons;
  }

  getColumn = (buttonArr) => {
    return <Column>{buttonArr}</Column>;
  }

  getColumns = (candidates) => {
    let buttons = this.getButtons(candidates);;
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

  getRow = (candidates) => {
    return <Row>{this.getColumns(candidates)}</Row>;
  }

  handleClick = (event) => {
    if(event.target.name == "yes") {
      console.log(this.update());
      console.log(this.toggleAccess());
      this.update() && this.toggleAccess() ? this.props.getPage("home") : console.log("There was an error submitting votes or toggling access");
    }
    else {
      this.props.getPage("vote");
    }
  }

  update = () => {

    fetch('/update', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selection: this.props.selection })
    })
    .then((res) => res.json())
    .then((res) => { return true; })
    .catch((err) => { console.log(err); return false; });
  }

  toggleAccess = () => {

    fetch('/toggleAccess', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.props.selection })
    })
    .then((res) => res.json())
    .then((res) => { return true; })
    .catch((err) => { console.log(err); return false; });
  }

  render() {
    return (
      <Container>
        {this.getRow(this.props.selection)}
        <Column>
          <h1>Are you satisfied with your selection?</h1>
          <button name="yes" type="button" onClick={this.handleClick.bind(this)}>Yes</button>
          <button name="no" type="button" onClick={this.handleClick.bind(this)}>No</button>
        </Column>
        <style jsx>{`

        `}</style>
      </Container>
    );
  }
}
