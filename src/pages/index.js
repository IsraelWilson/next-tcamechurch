import React from 'react'
import Link from 'next/link'
import Meta from '../components/Meta.js'
import Container from '../components/Container.js'
import Row from '../components/Row.js'
import Column from '../components/Column.js'

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
          form{
            padding: 2rem;
          }

          h1 {
            font-size: 2rem;
            text-align: center;
          }

          input {
            padding: 1rem;
            margin-bottom: 1.5rem;
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
            font-size: 1rem;
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

          p {
            text-align: center;
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
          form{
            padding: 2rem;
          }

          h1 {
            font-size: 2rem;
            text-align: center;
          }

          input {
            padding: 1rem;
            margin-bottom: 1.5rem;
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
            font-size: 1rem;
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

          p {
            text-align: center;logout
          }

        `}</style>
      </Container>
  )
}
