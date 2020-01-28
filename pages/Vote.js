import React from 'react'
import Container from '../components/Container.js'
import Row from '../components/Row'
import Column from '../components/Column'
import VoteButton from '../components/VoteButton'

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

  buttons = () => {
    let arr = this.state.candidates;
    let temp;
    console.log(arr);
    for(let i = 0; i < arr.length - 1; i++) {
      for(let j = 0; j < arr.length - 1; j++) {
        if(arr[i].name.split(" ")[1] < arr[i + 1].name.split(" ")[1]) {
          temp = arr[i + 1];
          arr[i + 1] = arr[i];
          arr[i] = temp;
        }
      }
    }
    console.log(arr);
    return (
      arr.map(candidate => (<VoteButton candidate={candidate} handleChange={this.handleChange} disabled={!this.state.selection.includes(candidate.name) && this.state.numSelected >= 19 ? "disabled" : false}/>))
    )
  }

  getColumn = (buttons) => {
    return (
        <Column>{buttons}</Column>
    )
  }

  getColumns = (buttons) => {
    let column = [];
    let columns = [];

    for(let i = 0; i < buttons.length; i++) {
      column.push(buttons[i]);
      if(i % 9 == 0 && i != 0 || i == buttons.length - 1) {
        columns.push(this.getColumn(column));
        column = [];
      }
    }

    return columns;
  }

  getRow = (buttons) => {
    return <Row>{this.getColumns(buttons)}</Row>;
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
        {this.getRow(this.buttons())}
        <form onClick={this.submit.bind(this)}>
          <Row justify="space-between">
            <label>{this.state.numSelected}</label>
            <button type="button">Submit</button>
          </Row>
        </form>
        <style jsx>{`
          form {
            padding: 2rem;
          }

          label {
            font-family: "Roboto", sans-serif;
            font-size: 2.5rem;
            text-align: center;
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
            font-size: 2.5rem;
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
