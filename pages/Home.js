import React from 'react'
import Container from '../components/Container.js'
import Row from '../components/Row'
import Column from '../components/Column'
import fetch from 'isomorphic-unfetch'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      live: false,
      candidates: [],
      userID: ""
    };
  }

  login = () => {
    const userID = this.state.userID;

    if(userID == ""){
      return;
    }

    if(userID == "tccadmin") {
      this.props.getPage("admin");
    }

    fetch('/access/' + userID)
    .then((res) => res.json())
    .then((res) => {
      if(res.length > 0) {
        console.log("res len > 0");
        if(res[0].voted == 0) {
          this.props.getPage("vote", [], userID);
        } else {
          // User already voted
          console.log("user voted");
        }
      } else {
        // Handle failed login attempt
        console.log("failed to login");

      }
    })
    .catch((err) => {
      console.log('Login error: ', err);
    })

  }

  change = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({[name]: value});
  }

  render = () => {
    return (
      <Container>
        <Row justify="center">
          <Column align="center">
            <form onClick={this.login.bind(this)}>
              <h1>Please Enter ID to Vote</h1>
              <Row>
                <label>User ID</label>
                <input type="text" name="userID" value={this.state.userID} onChange={this.change}/>
                <button type="button">Sign In</button>
              </Row>
              <p>To login as Admin enter password</p>
            </form>
          </Column>
        </Row>
        <style jsx>{`
          form{

          }

          h1 {

          }

          label {

          }

          input {

          }

          .button {
            display: inline-block;
            font-weight: $btn-font-weight;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -webkit-user-select: none;
               -moz-user-select: none;
                -ms-user-select: none;
                    user-select: none;
            border: $btn-border-width solid transparent;
            @include button-size($btn-padding-y, $btn-padding-x, $font-size-base, $btn-line-height, $btn-border-radius);
            @include transition($btn-transition);

            // Share hover and focus styles
            @include hover-focus {
              text-decoration: none;
            }

            &:focus,
            &.focus {
              outline: 0;
              -webkit-box-shadow: $btn-focus-box-shadow;
                      box-shadow: $btn-focus-box-shadow;
            }

            // Disabled comes first so active can properly restyle
            &.disabled,
            &:disabled {
              opacity: $btn-disabled-opacity;
              @include box-shadow(none);
            }

            // Opinionated: add "hand" cursor to non-disabled .btn elements
            &:not(:disabled):not(.disabled) {
              cursor: pointer;
            }

            &:not(:disabled):not(.disabled):active,
            &:not(:disabled):not(.disabled).active {
              background-image: none;
              @include box-shadow($btn-active-box-shadow);

              &:focus {
                @include box-shadow($btn-focus-box-shadow, $btn-active-box-shadow);
              }
            }
          }


          p {

          }

        `}</style>
      </Container>
    );
  }
}
