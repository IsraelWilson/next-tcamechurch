import React from 'react'
import Container from '../components/Container.js'
import Row from '../components/Row'
import Column from '../components/Column'

export default class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
      selection: [],
      numSelected: 0
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
    candidates.map((candidate) => buttons.push(<div><label>{candidate.name}</label><input name={candidate.name} type="checkbox" onChange={this.handleChange}/></div>));
    return buttons;
  }

  test = () => {
    return this.state.candidates.map(candidate => (<div><label>{candidate.name}</label><input name={candidate.name} type="checkbox" onChange={this.handleChange}/></div>));
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
    if(this.state.numSelected != 19){
      return;
    }

    this.props.getPage("confirm", this.state.selection, this.props.user);

  }

  handleChange = (event) => {
    let update = this.state.selection;
    console.log(update);
    if(event.target.checked) {
      update.push(event.target.name);
      this.setState({selection: update,
                     numSelected: this.state.numSelected + 1});
      console.log("Box was checked");
    }
    else if(!event.target.checked) {
      console.log("Box was unchecked");
      for(let i = 0; i < update.length; i++) {
        if(update[i] == event.target.name) {
          update.splice(i, 1);
          this.setState({selection: update,
                         numSelected: this.state.numSelected - 1});
          // Might not need the following since there should never
          // be a duplicate name in the array but its probably best
          // to have it to ensure we dont walk out of the array
          i--;
        }
      }
    }
  }

  render = () => {
    return (
      <Container>
        {this.test()}
        {this.getRow(this.state.candidates)}
        <form onClick={this.submit.bind(this)}>
          <Row>
            <label>{this.state.numSelected}</label>
            <button type="button">Submit</button>
          </Row>
        </form>
        <style jsx>{`
          div {
            display: flex;
            flex-direction: row;
            flex-grow: 1;
            justify-content: center;
          }

          form {
            padding: 2rem;
          }

          label {

          }

          button {
            border: none;
            padding: 1rem 2rem;
            margin-left: 0.25rem;
            margin-bottom: 1.5rem;
            text-decoration: none;
            background: #feda6a;
            color: #232323;
            font-family: "Roboto", sans-serif;
            font-size: 1rem;
            cursor: pointer;
            text-align: center;
            transition: background 250ms ease-in-out,
                        transform 150ms ease;
            -webkit-appearance: none;
            -moz-appearance: none;
          }

          button:hover,
          button:focus {
            background: #d6a206;
          }

          button:focus {
            outline: 1px solid #fff;
            outline-offset: -4px;
          }

          button:active {
            transform: scale(0.99);
          }
        `}</style>
      </Container>
    );
  }
}
