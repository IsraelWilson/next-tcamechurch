import React, { useState, useEffect } from 'react'
import Row from './Row'
import Column from './Column'

export default function Poll(props) {
  const [name, setName] = useState("")
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    (async function getCandidates() {
      const encodedValue = encodeURIComponent(props.poll_id)
      const result = await fetch(`/candidates?poll_id=${encodedValue}`)
      const candidates = await result.json()
      setCandidates(candidates)
    })()
  }, [])

  function addCandidate(event) {
    event.preventDefault()

    let newCandidates = candidates

    // Get names entered by the user
    let parsedName = name
    parsedName = parsedName.split(",")
    parsedName.forEach(item => item.trim());


    // Need to add input validation
    if(name !== "") {
      fetch("/candidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          candidate_name: parsedName,
          poll_id: props.poll_id
        })
      })
      .then(result => result.json())
      .then(data => {
        newCandidates = newCandidates.concat(data)
        setCandidates([...newCandidates])
      })
    }
  }

  function delCandidate(id, event) {
    event.preventDefault()

    const newCandidates = candidates

    const asyncDel = async () => {
      const result = await fetch("/candidate", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          candidate_id: id,
        })
      })

      const resJson = await result.json()
      console.log(resJson.affectedRows)
      setCandidates(newCandidates.filter(candidate => candidate.candidate_id !== id))
    }

    asyncDel()
  }

  function reset() {
    fetch("/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        poll_id: props.poll_id
      })
    })
    .then(() => {
      console.log("reset")
      async function getCandidates() {
        const encodedValue = encodeURIComponent(props.poll_id)
        const result = await fetch(`/candidates?poll_id=${encodedValue}`)
        const candidates = await result.json()
        console.log(candidates)
        setCandidates(candidates)
      }
      getCandidates()
    })
  }

  return (
    <Column>
      <Row>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <button type="button" onClick={e => addCandidate(e)}>ADD CANDIDATE</button>
        {props.active ?
          <button type="button" onClick={props.activate}>DEACTIVATE</button>
        :
          <button type="button" onClick={props.activate}>ACTIVATE</button>
        }
        <button type="button" onClick={() => reset()}>RESET</button>
      </Row>
      <Column>
        {candidates.map(candidate =>
          <Row>
            <h3>{candidate.candidate_name}</h3>
            <div>{candidate.num_votes}</div>
            <button type="button" onClick={e => delCandidate(candidate.candidate_id, e)}>DELETE</button>
          </Row>
        )}
      </Column>
      <style jsx>{`
        `}</style>
    </Column>
  )
}
