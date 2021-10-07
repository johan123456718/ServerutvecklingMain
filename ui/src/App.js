import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { ButtonGroup, ToggleButton, Form, Button, Navbar, Nav, FormControl, NavDropdown, Modal } from 'react-bootstrap';
import Log from './sites/Log.js';
import Register from './sites/Register.js';
import Messages from './sites/Messages.js';
import Login from './sites/Login.js';
import UserLogs from './sites/UserLogs.js';
import BoardContainer from './components/container/BoardContainer';
import Vertx from './sites/Vertx.js';
class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      UUID: 'UUID',
      token: 'token',
      displayName: '',
      isOnLoginPage: true,
      isOnLogPage: false,
      isOnUserLogsPage: false,
      isOnRegisterPage: false,
      isOnMessagePage: false,
      isOnWhiteboardPage: false,
      isOnVertxPage: false,
      inputUpdated: false,
      showLogin: true,
      showLogout: false,
      notLoggedIn: true,
    }
  }

  setUUID(uuid){
     this.setState({UUID: uuid});
   }

   setToken(token, displayName){
     console.log("APPJS: " + token + " UNAME;: " + displayName);
     this.setState({token: token, showLogin:false, notLoggedIn: false, displayName: displayName});
  }


  logout(){
    this.resetStates();
    this.setState({token:'token', UUID: 'UUID', displayName: '', showLogin: true, showLogout: false, notLoggedIn: true});
    this.showLogInPage();
  }

   logedInState(username){
     this.resetStates();
     this.setState({showLogin: false, showLogout: true, displayName: username, notLoggedIn: false})
     this.showLogPage();
   }

  updateInputChanges(){
    this.setState({inputUpdated: true});
  }

  resetStates() {
    if(this.state.isOnLoginPage){
      this.state.isOnLoginPage = false;
    }
    if (this.state.isOnLogPage){
      this.state.isOnLogPage = false;
    }
    if (this.state.isOnRegisterPage){
      this.state.isOnRegisterPage = false;
    }
    if (this.state.isOnMessagePage){
      this.state.isOnMessagePage = false;
    }
    if (this.state.isOnUserLogsPage){
      this.state.isOnUserLogsPage = false;
    }
    if (this.state.isOnWhiteboardPage){
      this.state.isOnWhiteboardPage = false;
    }
    if (this.state.isOnVertxPage){
      this.state.isOnVertxPage = false;
    }
  }
  showWhiteboardPage(){
    this.setState({isOnRegisterPage: false, isOnMessagePage: false, isOnLoginPage: false, isOnLogPage: false, isOnWhiteboardPage: false, isOnVertxPage: false});
    this.resetStates();
    this.setState({
      isOnWhiteboardPage: !this.state.isOnWhiteboardPage
    })
  }
  showUserLogsPage(){
    this.setState({isOnRegisterPage: false, isOnMessagePage: false, isOnLoginPage: false, isOnLogPage: false, isOnWhiteboardPage: false, isOnVertxPage: false});
    this.resetStates();
    this.setState({
      isOnUserLogsPage: !this.state.isOnUserLogsPage
    })
  }
  showLogInPage(){
    this.setState({isOnRegisterPage: false, isOnMessagePage: false, isOnLogPage: false, isOnUserLogsPage: false, isOnWhiteboardPage: false, isOnVertxPage: false});
    this.resetStates();
    this.setState({
      isOnLoginPage: !this.state.isOnLoginPage
    })
  }
  showLogPage(){
    this.setState({isOnRegisterPage: false, isOnMessagePage: false, isOnLoginPage: false, isOnUserLogsPage: false, isOnWhiteboardPage: false, isOnVertxPage: false});
    this.resetStates();
    this.setState({
      isOnLogPage: !this.state.isOnLogPage
    })
  }

  showRegisterPage(){
    this.setState({isOnLogPage: false, isOnMessagePage: false, isOnLoginPage: false, isOnUserLogsPage: false, isOnWhiteboardPage: false, isOnVertxPage: false});
    this.resetStates();
    this.setState({
      isOnRegisterPage: !this.state.isOnRegisterPage
    })
  }

  showMessagePage(){
    this.setState({isOnLogPage: false, isOnRegisterPage: false, isOnLoginPage: false, isOnUserLogsPage: false, isOnWhiteboardPage: false, isOnVertxPage: false});
    this.resetStates();
    this.setState({
      isOnMessagePage: !this.state.isOnMessagePage
    })
  }

  showVertxPage(){
    this.setState({isOnLogPage: false, isOnRegisterPage: false, isOnLoginPage: false, isOnUserLogsPage: false, isOnWhiteboardPage: false, isOnMessagePage: false});
    this.resetStates();
    this.setState({
      isOnVertxPage: !this.state.isOnVertxPage
    })
  }

  render(){
    return (
      <div className="App">
      {!this.state.notLoggedIn?
      <div class = "navBar">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#Log" onClick = {() => this.showLogPage()}>{this.state.displayName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href='#UserLogs' onClick = {() => this.showUserLogsPage()}>Logs</Nav.Link>
              <Nav.Link href='#messages' onClick = {() => this.showMessagePage()}>Messages</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1" onClick = {() => this.showWhiteboardPage()}>Whiteboard</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" onClick = {() => this.showVertxPage()}>Vertx</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Nav class="nav navvar-nav navbar-right">
          {this.state.showLogout?
              <Nav.Link href='#logout' onClick = {() => this.logout()}>Logout</Nav.Link>
          :null}
          </Nav>
        </Navbar>
      </div>
:null}
      {this.state.isOnLoginPage?
        <div>
          <Login setToken={(e, f)=>this.setToken(e, f)} setUUID={(e) => this.setUUID(e)} logedInState={(e) => this.logedInState(e)} gotoRegisterPage={() => this.showRegisterPage()}/>
        </div>
      :null}

      {this.state.isOnUserLogsPage?
        <div>
          <h1> Whos log would you like to visit? </h1>

          <UserLogs token={this.state.token} UUID={this.state.UUID} setUUID={(e)=>this.setUUID(e)}/>
        </div>
      :null}

      {this.state.isOnLogPage?
        <div>
          <h1> Welcome to the log {this.state.displayName} </h1>

          <Log token={this.state.token} UUID={this.state.UUID} setUUID={(e)=>this.setUUID(e)}/>
        </div>
      :null}

      {this.state.isOnRegisterPage?
        <div>
          <Register showLogInPage={() => this.showLogInPage()}/>
        </div>
      :null}

      {this.state.isOnMessagePage?
        <div>
          <h1> Welcome to the messages </h1>
          <Messages token={this.state.token} UUID={this.state.UUID} setUUID={(e)=>this.setUUID(e)}/>
        </div>
      :null}

      {this.state.isOnWhiteboardPage?
        <div>
          <BoardContainer token={this.state.token} UUID={this.state.UUID} setUUID={(e) => this.setUUID(e)} />
        </div>
      :null}

      {this.state.isOnVertxPage?
        <div>
          <Vertx token={this.state.token} UUID={this.state.UUID} setUUID={(e) => this.setUUID(e)} />
        </div>
      :null}
      </div>
    );
  }
}

export default App;
