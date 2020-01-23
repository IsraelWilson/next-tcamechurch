import React from 'react'
import Container from '../components/Container.js'
import Row from '../components/Row'
import Column from '../components/Column'
import VoteButton from '../components/VoteButton'
import VoteColumn from '../components/VoteColumn'
import VoteRow from '../components/VoteRow'

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
    return (
      this.state.candidates.map(candidate => (<VoteButton candidate={candidate} handleChange={this.handleChange}/>))
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
      if(i % 10 == 0 && i != 0 || i == buttons.length - 1) {
        columns.push({getColumn({column})});
        column = [];
      }
    }

    return columns;
  }

  // getRow = (candidates) => {
  //   return <Row>{getColumns(candidates)}</Row>;
  // }

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
        {this.getColumns(this.buttons())}
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
