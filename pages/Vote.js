import React from 'react'
import Container from '../components/Container.js'
import Row from '../components/Row'
import Column from '../components/Column'

export default class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
      selection: 0
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
    candidates.map((candidate) => buttons.push(<div><label>{candidate.trustee_name}</label><input name={candidate.trustee_name} type="checkbox"/></div>));
    return buttons;
  }

  submit = () => {
    if(this.state.selection != 10){
      return;
    }

    // Get the selected candidates
    let selected = [];

    this.props.getPage("confirm", selected);

  }

  render = () => {
    return (
      <Container>
        {this.getRow(this.state.candidates)}
        <form onClick={this.submit.bind(this)}>
          <Row>
            <label>{this.state.selection}</label>
            <button type="button">Submit</button>
          </Row>
        </form>
        <style jsx>{`

        `}</style>
      </Container>
    );
  }
}
