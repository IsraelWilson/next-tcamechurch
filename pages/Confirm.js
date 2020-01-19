import React from 'react'
import Container from '../components/Container.js'

export default class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: []
    };
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

  getButtons = (candidates) => {
    let buttons = [];
    candidates.map((candidate) => buttons.push(<button type="button">{candidate.trustee_name}: <label>{candidate.vote_num}</label></button>));
    return buttons;
  }

  render() {
    return (
      <Container>
        {this.getRow(this.props.selection)}
        <style jsx>{`

        `}</style>
      </Container>
    );
  }
}
