import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Container from '../components/Container.js'
import Row from '../components/Row'
import Column from '../components/Column'

const ThankYou = (props) => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => router.push("/logout"), 5000)
  }, [])

  return (
    <Container>
      <Column align="center">
        <div>Thank You for Voting!</div>
        <Link href="/logout">
          <a>Finish</a>
        </Link>
      </Column>
      <style jsx>{`
        div {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        a:link, a:visited {
          background-color: purple;
          color: white;
          padding: 14px 25px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-family: "Roboto", sans-serif;
          font-size: 2rem;
        }

        a:hover, a:active {
          background-color: #B270A9;
        }
        `}</style>
    </Container>
  );
}

export default ThankYou
