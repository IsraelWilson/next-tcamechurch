import Row from './Row.js'
import Link from 'next/link'
import React from 'react'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {about: "inactive",
                  experience: "inactive",
                  skills: "inactive",
                  education: "inactive",
                  socialize: "inactive",
                  contact: "inactive"};
    this.divRef = React.createRef();
  }

  getContainer() {
    return this.divRef;
  };

  render() {
    return (
      <div ref={this.divRef} className={this.props.class}>
        <Link href="#about"><a className={this.props.section.about ? "active" : "inactive"}>About</a></Link>
        <Link href="#experience"><a className={this.props.section.experience ? "active" : "inactive"}>Experience</a></Link>
        <Link href="#skills"><a className={this.props.section.skills ? "active" : "inactive"}>Skills</a></Link>
        <Link href="#education"><a className={this.props.section.education ? "active" : "inactive"}>Education</a></Link>
        <Link href="#socialize"><a className={this.props.section.socialize ? "active" : "inactive"}>Socialize</a></Link>
        <Link href="#contact"><a className={this.props.section.contact ? "active" : "inactive"}>Contact</a></Link>
        <style jsx>{`
          div {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            flex-grow: 1;
            justify-content: flex-end;
          }

          .sticky {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            flex-grow: 1;
            justify-content: flex-end;
            position: sticky;
            top: 0;
            background-color: #232323;
          }

          a {
            padding: 1rem 1.5rem;
            text-decoration: none;
            text-transform: uppercase;
            color: #FFFFFF;
          }

          a:hover {
            color: #feda6a;
          }

          a:active {
            background-color: black;
          }

          a:visited {
            background-color: #ccc;
          }

          .active {
            color: #feda6a;
          }
        `}</style>
      </div>
    );
  }
}
