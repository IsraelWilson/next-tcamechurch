import React, { useState, useEffect } from 'react'
import Container from '../components/Container'
import Row from '../components/Row'
import Column from '../components/Column'
import PollCard from '../components/PollCard'
import Poll from '../components/Poll'

export default function Admin(props) {
  const [polls, setPolls] = useState([])
  const [viewPoll, setViewPoll] = useState(-1)

  useEffect(() => {
    (async function getPolls() {
      const result = await fetch("/polls")
      const polls = await result.json()
      setPolls(polls)
    })()
  }, [])

  function addPoll(event) {
    event.preventDefault()

    const newPolls = polls

    const asyncAdd = async () => {
      const result = await fetch("/poll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const newPoll = await result.json()
      newPolls.push(newPoll[0])
      setPolls([...newPolls])
    }

    asyncAdd()
  }

  function delPoll(id) {
    const newPolls = polls

    const asyncDel = async () => {
      const result = await fetch("/poll", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          poll_id: id,
        })
      })

      const resJson = await result.json()
      console.log(resJson.affectedRows)
      setPolls(newPolls.filter(poll => poll.poll_id !== id))
    }

    asyncDel()
  }

  function activate(index) {
    const newPolls = [...polls]

    const asyncActivate = async () => {
      const result = await fetch("/poll/toggle-active", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          poll_id: newPolls[index].poll_id
        })
      })

      const resJson = await result.json()
      console.log(resJson)

      // If the poll is active, all the others are already false. Update single poll
      if(newPolls[index].is_active === true) {
        newPolls[index].is_active = false
      }
      // Otherwise, make sure any active poll is deactivated. Activate selected poll
      else {
        for(let i = 0; i < newPolls.length; i++) {
          newPolls[i].is_active = false
        }
        newPolls[index].is_active = true
      }

      // Update the polls state
      setPolls(newPolls)
    }

    asyncActivate()
  }

  function view(index) {
    setViewPoll(index)
  }

  return (
    viewPoll === -1 ?
      <Column>
        <button type="button" onClick={e => addPoll(e)}>ADD POLL</button>
        {polls.map((poll, index) => <PollCard name={poll.poll_name} view={() => view(index)} del={() => delPoll(poll.poll_id)} activate={() => activate(poll.poll_id)}></PollCard>)}
      <style jsx>{`
        `}</style>
      </Column>
      :
      <Column>
        <button type="button" onClick={() => view(-1)}>GO BACK</button>
        <Poll poll_id={polls[viewPoll].poll_id} active={polls[viewPoll].is_active} activate={() => activate(viewPoll)} />
      <style jsx>{`
        `}</style>
      </Column>
  )
}
