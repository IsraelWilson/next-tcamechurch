import React from 'react'
import Link from 'next/link'
import Meta from '../components/Meta.js'
import Container from '../components/Container.js'
import Row from '../components/Row.js'
import Column from '../components/Column.js'
import Calandar from '../components/Calandar.js'

export default function Index({ user }) {
  return (
    user ?
      <Container>
        <Row justify="center">
          <Column align="center">
            <Link href="/Vote">
              <a>Vote</a>
            </Link>
          </Column>
        </Row>
        <style jsx>{`
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
      :
      <Container>
        <Row justify="center">
          <Column align="center">
            <Link href="/login">
              <a>Sign In</a>
            </Link>
          </Column>
        </Row>
        <style jsx>{`
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
  )
}
