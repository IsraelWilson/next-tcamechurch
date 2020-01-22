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
      users: [],
      name: ""
    };
  }

  componentDidMount = () => {
    this.tally()
    this.getUsers()
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

  getTallyButtons = (candidates) => {
    let buttons = [];
    candidates.map((candidate) => buttons.push(<button type="button">{candidate.name}: <label>{candidate.votes}</label></button>));
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

    if(type == "user") {
      buttons = this.getUserButtons(candidates);
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
    candidates.map((candidate) => buttons.push(<div>{candidate.name}: <button name={candidate.name} onClick={this.handleManageButton}>X</button></div>));
    return buttons;
  }

  getManageRow = (candidates) => {
    return <Row>{this.getColumns(candidates, "manage")}</Row>
  }

  getUserButtons = (users) => {
    let buttons = [];
    users.map((user) => buttons.push(<div>{user.user_id}</div>));
    return buttons;
  }

  getUserRow = (users) => {
    return <Row>{this.getColumns(users, "user")}</Row>
  }

  handleName = (event) => {
    this.setState({name: event.target.value});
  }

  handleCandidateForm = (event) => {
    if(event.target.name == "add") {
      fetch('/add' + this.state.name, {
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
        {this.getTallyRow(this.state.candidates)}
        <h1>Manage</h1>
        {this.getManageRow(this.state.candidates)}
        <form onClick={this.handleCandidateForm.bind(this)}>
          <Row>
            <input type="text" value={this.state.name} onChange={this.handleName}/>
            <button name="add" type="button">Add Candidate</button>
            <button name="drop" type="button">Remove All</button>
          </Row>
        </form>
        <h1>Yet To Vote</h1>
        {this.getUserRow(this.state.users)}
        <style jsx>{`

        `}</style>
      </Container>
    );
  }
}
