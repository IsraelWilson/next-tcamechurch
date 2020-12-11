import React, { useState, useEffect } from 'react'
import Container from '../components/Container.js'
import Row from '../components/Row'
import Column from '../components/Column'
import VoteButton from '../components/VoteButton'

export default function Vote(props) {
  const [selection, setSelection] = useState([])

  function buttons() {
    let arr = this.state.candidates;
    return (
      arr.map(candidate => (<VoteButton candidate={candidate} handleChange={this.handleChange} disabled={!this.state.selection.includes(candidate.name) && this.state.numSelected >= 19 ? "disabled" : false}/>))
    )
  }

  function getColumn(buttons) {
    return (
        <Column>{buttons}</Column>
    )
  }

  function getColumns(buttons) {
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

  function getRow(buttons) {
    return <Row>{this.getColumns(buttons)}</Row>;
  }

  function submit() {
    if(this.state.numSelected != 19){
      return;
    }

    this.props.getPage("confirm", this.state.selection, this.props.user);

  }

  function handleChange(event) {
    let update = this.state.selection;

    if(event.target.checked) {
      update.push(event.target.name);
      this.setState({selection: update,
                     numSelected: this.state.numSelected + 1});
    }

    if(!event.target.checked) {
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
  )
}

Vote.getInitialProps = async ({ req }) => {
  const baseURL = req ? `${req.protocol}://${req.get("Host")}` : ""
  const res = await fetch(`${baseURL}/tally`)
  console.log(res)

  return {
    candidates: await res.json()
  }
}
