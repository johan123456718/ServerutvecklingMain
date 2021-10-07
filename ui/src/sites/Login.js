import React, {Component } from 'react';
import {Button, Form, FormGroup, ButtonGroup} from 'react-bootstrap';
import './css/Login.css';

class Login extends Component {
  constructor(props){
      super(props);
      this.state = {
          error : null,
          wrongEntry: false,
          successful: false
      };
      this.passwordRef = React.createRef();
      this.userNameRef = React.createRef();
  }


  gotoRegisterPage(){
    this.props.gotoRegisterPage();
  }

  login(){
      fetch('http://localhost:9091/demo/signIn?username=' + this.userNameRef.current.value + '&password=' + this.passwordRef.current.value,{
          method: 'POST',
        })

          .then( response => response.json())
          .then(
            // handle the result
            (result) => {
              console.log(result);
              if(result.username === this.userNameRef.current.value && result.token !== undefined){
                this.props.setToken(result.token, result.username);
                this.successfulLogin(result.uuid);
              }else {this.setState({wrongEntry: true, successful: true});}
            },

            // Handle error
            (error) => {
                this.setState({
                    error
                })
            },
        );
      }

   successfulLogin(uuid){
      this.props.setUUID(uuid);
      this.props.logedInState(this.userNameRef.current.value);
    }

  render(){
  /*Error checker */
  const {error} = this.state;
  if(error){
      return <div>Error in loading </div>
  }else{
      return(
        <div class = "container-fluid p-0">
            <div class = "flex-grid-loginPage">
              <div className = "container-loginPage">
                <Form className = "login-form">

                  <h1><span className = "loginText"> Login </span> </h1>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" ref={this.userNameRef}/>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={this.passwordRef}/>
                    {this.state.wrongEntry?
                      <Form.Text className="redText">
                        Username or password is incorrect.
                      </Form.Text>
                    :null}
                  </Form.Group>
                  <ButtonGroup className="login-button-grp-single">
                    <Button href="#Register" variant="choiceButton" className = "mobileButton" onClick = {() => this.gotoRegisterPage()}>
                      <a className="loginButtonText" >{"Register"}</a>
                    </Button>

                    <Button variant="choiceButton" className = "mobileButton" onClick = {() => this.login()}>
                      <a className="loginButtonText">{"Login"}</a>
                    </Button>
                  </ButtonGroup>
                </Form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;
