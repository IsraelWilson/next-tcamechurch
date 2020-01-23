import React from 'react'
import Container from '../components/Container.js'
import Row from '../components/Row'
import Column from '../components/Column'
import AdminButtonTally from '../components/AdminButtonTally'
import AdminButtonManage from '../components/AdminButtonManage'
import AdminButtonUser from '../components/AdminButtonUser'

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      live: false,
      candidates: [],
      users: [],
      name: ""
    };
  }

  componentDidMount = () => {
    this.tIntervalID = setInterval(() => this.tally(), 5000);
    this.uIntervalID = setInterval(() => this.getUsers(), 5000);
  }

  componentWillMount = () => {
    clearInterval(this.tIntervalID);
    clearInterval(this.uIntervalID);
  }

  tally = () => {
    fetch('/tally')
    .then((res) => res.json())
    .then((res) => {
      this.setState({candidates: res});
    })
    .catch((err) => { console.log(err) })
  }

  getUsers = () => {
    fetch('/access')
    .then((res) => res.json())
    .then((res) => {
      this.setState({users: res});
    })
    .catch((err) => { console.log(err) })
  }

  getTallyButtons = () => {
    return (
      this.state.candidates.map(candidate => (<AdminButtonTally candidate={candidate}/>))
    )
  }

  getColumn = (buttonArr) => {
    return <Column>{buttonArr}</Column>;
  }

  getColumns = (buttons) => {
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

  getRow = (buttons) => {
    return <Row>{this.getColumns(buttons)}</Row>;
  }

  getManageButtons = () => {
    return (
      this.state.candidates.map(candidate => (<AdminButtonManage candidate={candidate} click={this.handleManageButton}/>))
    )
  }

  getUserButtons = () => {
    return (
      this.state.users.map(user => (<AdminButtonUser user={user}/>))
    )
  }

  handleName = (event) => {
    this.setState({name: event.target.value});
  }

  handleCandidateForm = (event) => {
    if(event.target.name == "add") {
      fetch('/add', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: this.state.name })
      })
      .then((res) => res.json())
      .then((res) => { this.tally(); })
      .catch((err) => { console.log(err) })
    }
    else if(event.target.name == "drop") {
      fetch('/nuke', {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: this.state.name })
      })
      .then((res) => res.json())
      .then((res) => { this.tally(); })
      .catch((err) => { console.log(err) })
    }
  }

  handleManageButton = (event) => {
    fetch('/delete', {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: event.target.name })
    })
    .then((res) => res.json())
    .then((res) => { this.tally(); })
    .catch((err) => { console.log(err) })
  }

  render = () => {
    return (
      <Container>
        <h1>Results</h1>
        {this.getRow(this.getTallyButtons())}
        <h1>Manage</h1>
        {this.getRow(this.getManageButtons())}
        <form onClick={this.handleCandidateForm.bind(this)}>
          <Row>
            <input type="text" value={this.state.name} onChange={this.handleName}/>
            <button name="add" type="button">Add Candidate</button>
            <button name="drop" type="button">Remove All</button>
          </Row>
        </form>
        <h1>Yet To Vote</h1>
        {this.getRow(this.getUserButtons())}
        <style jsx>{`
          h1 {

          }

          form {

          }

          input {

          }

          button {
            display: inline-block;
            border: none;
            padding: 1rem 2rem;
            margin: 0;
            text-decoration: none;
            background: #0069ed;
            color: #ffffff;
            font-family: sans-serif;
            font-size: 1rem;
            line-height: 1;
            cursor: pointer;
            text-align: center;
            transition: background 250ms ease-in-out, transform 150ms ease;
            -webkit-appearance: none;
            -moz-appearance: none;
          }

          button:hover,
          button:focus {
            background: #0053ba;
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
