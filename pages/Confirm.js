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

  handleClick = (button) => {
    if(button == "yes") {
      this.props.getPage("home");
    }
    else {
      this.props.getPage("vote");
    }
  }

  render() {
    return (
      <Container>
        {this.getRow(this.props.selection)}
        <Column>
          <h1>Are you satisfied with your selection?</h1>
          <button type="button" onClick={this.handleClick("yes")}>Yes</button>
          <button type="button" onClick={this.handleClick("no")}>No</button>
        </Column>
        <style jsx>{`

        `}</style>
      </Container>
    );
  }
}
