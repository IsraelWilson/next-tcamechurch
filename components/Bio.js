import ColumnBasis from '../components/ColumnBasis.js'

export default function Bio(props) {
  return (
      <ColumnBasis>
        <h1>{props.title}</h1>
        <hr/>
        <h2>{props.sub}</h2>
        <p>{props.desc}</p>
      {/*
      <div className="pic">
        <img src={props.src} />
      </div>
      */}
      <style jsx>{`
        /*
        h1 {
          font-size: 4rem;
          margin-bottom: 1.5rem;
        }

        h2 {
          margin-bottom: 1.5rem;
        }

        p {
          font-size: 2rem;
        }

        img {
          max-width: 100%;
          max-height: 100%;
        }

        .pic {
          justify-content: center;
          margin-left: 2rem;
        }
        */

        /* Landscape phones and down */
        /*
        @media (max-width: 600px) {
          div {
            display: flex;
            flex-direction: column;
            flex-basis: 50%;
          }
        }
        */

        /* Landscape phone to portrait tablet */
        /*
        @media (max-width: 900px) {
          div {
            display: flex;
            flex-direction: column;
            flex-basis: 50%;
          }
        }
        */

        /* Portrait tablet to landscape and desktop */
        /*
        @media (min-width: 1200px) {
          div {
            display: flex;
            flex-direction: column;
            flex-basis: 25%;
          }
        }
        */

        /* Large desktop */
        /*
        @media (min-width: 1900px) {
          div {
            display: flex;
            flex-direction: column;
            flex-basis: 25%;
          }
        }
        */

        /* Everything below the line is the active css */
        /* Everything below the line is the active css */
        /* Everything below the line is the active css */

        h1 {
          font-size: 2rem;
          margin: 3rem 0 1.5rem;
          text-align: center;
        }

        h2 {
          margin-bottom: 3rem;
          text-align: center;
          color: #feda6a;
        }

        p {
          font-size: 2rem;
          text-align: center;
        }

        img {
          max-width: 100%;
          max-height: 100%;
        }

        .pic {
          justify-content: center;
          margin-left: 2rem;
        }
      `}</style>
    </ColumnBasis>
  )
}
