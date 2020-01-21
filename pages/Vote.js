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

  getButtons = (candidates) => {
    let buttons = [];
    candidates.map((candidate) => buttons.push(<div><label>{candidate.trustee_name}</label><input name={candidate.trustee_name} type="checkbox" onChange={this.handleChange}/></div>));
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

  submit = () => {
    if(this.state.selection != 10){
      return;
    }

    // Get the selected candidates
    let selected = [];

    this.props.getPage("confirm", selected);

  }

  handleChange = (event) => {
    let update = this.state.candidates;
    console.log(update);
    if(event.target.checked) {
      // this.setState({candidates: this.state.candidates.push(event.target.name),
      //                selection: this.state.selection + 1});
      console.log("Box was checked");
    }
    else if(!event.target.checked) {
      console.log("Box was unchecked");
      // for(let i = 0; i < update.length; i++) {
      //   if(update[i] == event.target.name) {
      //     this.setState({candidates: update.splice(i, 1)});
      //     // Might not need the following since there should never
      //     // be a duplicate name in the array but its probably best
      //     // to have it to ensure we dont walk out of the array
      //     i--;
      //   }
      // }
    }
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
