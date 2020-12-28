import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Container from '../components/Container.js'
import Row from '../components/Row'
import Column from '../components/Column'
import VoteButton from '../components/VoteButton'

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
        <Row>
          {!isAdmin() && (
            <Link href="/logout">
              <a>LOGOUT</a>
            </Link>
          )}
          {isAdmin() && (
            <>
              <Link href="/logout">
                <a>LOGOUT</a>
              </Link>
              <Link href="/Admin">
                <a>ADMIN</a>
              </Link>
            </>
          )}
        </Row>
        {buttons(selection)}
        <button onClick={e => submit(e)}>SUBMIT</button>
        <button onClick={e => cancel(e)}>CANCEL</button>
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
      :
      <Container>
        <Row>
          {!isAdmin() && (
            <Link href="/logout">
              <a>LOGOUT</a>
            </Link>
          )}
          {isAdmin() && (
            <>
              <Link href="/logout">
                <a>LOGOUT</a>
              </Link>
              <Link href="/Admin">
                <a>ADMIN</a>
              </Link>
            </>
          )}
        </Row>
        {buttons(props.candidates)}
        <button onClick={e => confirm(e)}>CONFIRM</button>
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
            outline-offset: -4px;// Helper function for update
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
    <div>Your vote has been submitted.  Thank you!</div>
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
