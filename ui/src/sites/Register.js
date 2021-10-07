import React, {Component } from 'react';
import {Button, Form, FormGroup, ButtonGroup} from 'react-bootstrap';
import './css/Register.css';


class Register extends Component{

  constructor(props){
      super(props);
      this.state = {
          error : null,
          wrongEntry: false,
          uuid: "",
      };
      this.passwordRef = React.createRef();
      this.passwordConfirmRef = React.createRef();
      this.userNameRef = React.createRef();
  }

  createFolder(uuid){
    console.log(this.state.uuid);
    console.log(uuid);
    fetch('http://localhost:8080/demo/createFolder?uuid=' + uuid,{
      method: 'POST',})

      .then( response => response.json())
      .then(
        // handle the result
        (result) => {
          console.log(result);

        },

        // Handle error
        (error) => {
            this.setState({
                error
            })
        },
    );
    this.props.setUUID(uuid);
  }

  checkPass(){
    console.log("pass1: " + this.passwordRef.current.value +" Pass2: "+ this.passwordConfirmRef.current.value);
    if (this.passwordRef.current.value === this.passwordConfirmRef.current.value) {
        return true;
    }else return false;
  }

  register()
  {
    if(this.checkPass()){
      fetch('http://localhost:9091/demo/register?username=' + this.userNameRef.current.value + '&password=' + this.passwordRef.current.value,{
        method: 'POST',})

        .then( response => response.json())
        .then(
          // handle the result
          (result) => {
            console.log(result.uuid);
            this.setState({uuid: result.uuid});
            this.createFolder(result.uuid);
            if(result.username === this.userNameRef.current.value){
              this.props.showLogInPage();
            }else { this.setState({wrongEntry: true}); }
          },

          // Handle error
          (error) => {
              this.setState({
                  error
              })
          },
      );

    }else{ this.setState({wrongEntry: true});}
    this.props.setUUID(this.state.uuid);
  }

  render(){
    return (
      <div class = "container-fluid p-0">
          <div class = "flex-grid-loginPage">
            <div className = "container-loginPage">
              <Form className = "login-form">
                <h1><span className = "loginText"> Register </span> </h1>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Username" ref={this.userNameRef}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword" >
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" ref={this.passwordRef}/>
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control type="password" placeholder="Password" ref={this.passwordConfirmRef}/>
                  {this.state.wrongEntry?
                    <Form.Text className="redText">
                      Username taken or password doesn't match.
                    </Form.Text>
                  :null}
                </Form.Group>
                <ButtonGroup className="login-button-grp-single">
                  <Button variant="choiceButton" className = "mobileButton" onClick = {() => this.register()}>
                    <a className="loginButtonText">{"Register"}</a>
                  </Button>
                </ButtonGroup>
              </Form>
          </div>
        </div>
      </div>

      );
    }
  }
export default Register;
