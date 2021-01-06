import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Container from '../components/Container.js'
import Row from '../components/Row'
import Column from '../components/Column'
import VoteButton from '../components/VoteButton'
import SelectionItem from '../components/SelectionItem'

export default function Vote(props) {
  const [selection, setSelection] = useState([])
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [history, setHistory] = useState([])

  useEffect(() => {
    (async () => {
      const result = await fetch(`/history/` + props.user.user_id)
      const resJson = await result.json()
      setHistory(resJson)
    })()
  }, [])

  function buttons(candidates) {
    return (
      candidates.map(candidate => <VoteButton name={candidate.candidate_name} checked={contains(selection, candidate) ? true : false} toggleSelected={() => toggleSelected(candidate)} disabled={(selection.length === 19 && !contains(selection, candidate)) ? true : false} />)
    )
  }

  function selectionList(candidates) {
    return candidates.map(candidate => <SelectionItem name={candidate.candidate_name}/ >)
  }

  function confirm(event) {
    event.preventDefault()

    if(selection.length !== 19){
      return
    }

    setIsConfirmed(true)
  }

  function cancel(event) {
    event.preventDefault()
    setIsConfirmed(false)
  }

  async function submit(event) {
    event.preventDefault()

    const data = {
      auth_id: props.user.user_id,
      selection: selection
    }

    const res = await fetch("/update", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })

    Router.push("/")
  }

  function contains(arr, obj) {
    for(let i = 0; i < arr.length; i++) {
      if(arr[i] === obj) {
        return true
      }
    }
    return false
  }

  function toggleSelected(candidate) {
    const newSelections = selection.filter(obj => obj !== candidate)
    if(newSelections.length === selection.length) {
      newSelections.push(candidate)
      setSelection(newSelections)
      return
    }
    setSelection(newSelections)
  }

  function isAdmin() {
    let admin = props.admins.filter(admin => admin.auth_id === props.user.user_id)
    if(admin.length > 0) {
      return true
    }
    return false
  }

  function getView() {
    return (
      isConfirmed ?
      <Container>
        <Row justify="flex-end">
          {!isAdmin() && (
              <div className="nav-link">
                <Link href="/logout">
                  <a>LOGOUT</a>
                </Link>
              </div>
          )}
          {isAdmin() && (
            <>
              <div className="nav-link">
                <Link href="/logout">
                  <a>LOGOUT</a>
                </Link>
              </div>
              <div className="nav-link">
                <Link href="/Admin">
                  <a>ADMIN</a>
                </Link>
              </div>
            </>
          )}
        </Row>
        <div className="parent">
          <div className="selection-row"><div className="selection-count">{selection.length}</div></div>
        </div>
        <Row justify="center">
          <Column>
            {selectionList(selection)}
            <Row>
              <button onClick={e => submit(e)}>SUBMIT</button>
              <button className="cancel" onClick={e => cancel(e)}>CANCEL</button>
            </Row>
          </Column>
        </Row>
        <style jsx>{`
          .parent {
            position: fixed;
            top: 0;
            left: 0;
            margin: auto;
            width: 100%;
          }

          .selection-count {
            font-size: 52px;
          }

          .selection-row {
            display: flex;
            justify-content: flex-end;
            position: sticky;
          }

          .nav-link {
              margin: 20px;
          }

          .nav {
            display: flex;
          }

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
            background: purple;
            color: white;
            font-family: "Roboto", sans-serif;
            font-size: 2rem;
            cursor: pointer;
            text-align: center;
            transition: background 250ms ease-in-out,
                        transform 150ms ease;
            -webkit-appearance: none;
            -moz-appearance: none;
          }

          button:hover,
          button:focus {
            background: #B270A9;
          }

          button:focus {
            outline: 1px solid #fff;
            outline-offset: -4px;
          }

          button:active {
            transform: scale(0.99);
          }

          button.cancel {
            font-size: 1rem;
            border: 5px solid #f44336;
            background: white;
            color: #f44336;
          }

          button.cancel:hover,
          button:focus {
            background: #f44336;
            color: white;
          }

          button.cancel:focus {
            outline: 1px solid #fff;
            outline-offset: -4px;
          }

          button.cancel:active {
            transform: scale(0.99);
          }
        `}</style>
      </Container>
      :
      <Container>
        <Row justify="flex-end">
          {!isAdmin() && (
              <div className="nav-link">
                <Link href="/logout">
                  <a>LOGOUT</a>
                </Link>
                </div>
          )}
          {isAdmin() && (
            <>
              <div className="nav-link">
                <Link href="/logout">
                  <a>LOGOUT</a>
                </Link>
              </div>
              <div className="nav-link">
                <Link href="/Admin">
                  <a>ADMIN</a>
                </Link>
              </div>
            </>
          )}
        </Row>
        <div className="parent">
          <div className="selection-row"><div className="selection-count">{selection.length}</div></div>
        </div>
        <Row justify="center">
          <Column>
            {buttons(props.candidates)}
            <button onClick={e => confirm(e)}>CONFIRM</button>
          </Column>
        </Row>
        <style jsx>{`
          .parent {
            position: fixed;
            top: 0;
            left: 0;
            margin: auto;
            width: 100%;
          }

          .selection-count {
            font-size: 52px;
          }

          .selection-row {
            display: flex;
            justify-content: flex-end;
            position: sticky;
          }

          .selection {
            margin-bottom: 12px;
            font-size: 2.5rem;
          }

          .nav-link {
              margin: 20px;
          }

          .nav {
            display: flex;
          }

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
            background: purple;
            color: white;
            font-family: "Roboto", sans-serif;
            font-size: 2rem;
            cursor: pointer;
            text-align: center;
            transition: background 250ms ease-in-out,
                        transform 150ms ease;
            -webkit-appearance: none;
            -moz-appearance: none;
          }

          button:hover,
          button:focus {
            background: #B270A9;
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


  return (
    history.length > 0 && !isAdmin() ?
    <Container>
      <Row justify="center">
        <Column>
          <p>Your vote has been submitted.  Thank you!</p>
        </Column>
      </Row>
      <style jsx>{`
        p {
          font-size: 2rem;
        }
      `}</style>
    </Container>
    :
    getView()
  )
}

Vote.getInitialProps = async ({ req }) => {
  const baseURL = req ? `${req.protocol}://${req.get("Host")}` : ""
  const res = await fetch(`${baseURL}/admins-candidates`)
  const resJson = await res.json()

  return {
    candidates: resJson.candidates,
    admins: resJson.admins
  }
}
