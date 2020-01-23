import React from 'react'
import Container from '../components/Container.js'
import Row from '../components/Row'
import Column from '../components/Column'
import ConfirmButton from '../components/ConfirmButton'

export default class Confirm extends React.Component {
  constructor(props) {
    super(props);
  }

  getButtons = (selection) => {
    return (
      selection.map(name => (<ConfirmButton name={name}/>))
    )
  }

  getColumn = (buttonArr) => {
    return <Column>{buttonArr}</Column>;
  }

  getColumns = (selection) => {
    let buttons = this.getButtons(selection);;
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

  getRow = (selection) => {
    return <Row>{this.getColumns(selection)}</Row>;
  }

  handleClick = (event) => {
    if(event.target.name == "yes") {

      for(let i = 0; i < this.props.selection.length; i++) {
        // Should use await or promises in order to get a value back
        // from the these fetch methods. They are asynchronous so they
        // return before they finish executing
        this.update(this.props.selection[i]);
      }

      this.toggleAccess();
      this.props.getPage("home");
    }
    else {
      this.props.getPage("vote");
    }
  }

  update = (selection) => {

    fetch('/update', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: selection })
    })
    .then((res) => res.json())
    .then((res) => { return res; })
    .catch((err) => { console.log(err); return 0; });
  }

  toggleAccess = () => {

    fetch('/toggleAccess', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: this.props.user })
    })
    .then((res) => res.json())
    .then((res) => { return res; })
    .catch((err) => { console.log(err); return 0; });
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
          h1 {

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
