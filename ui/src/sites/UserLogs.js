import React, { Component } from "react";
import {Button, Form, Card} from 'react-bootstrap';
import './css/UserLogs.css';
import {Bar, Line, Pie} from 'react-chartjs-2';
import Chart from '../components/diagram/Chart';


class UserLogs extends Component{
  constructor(props){
    super(props);
    this.state = {
      UUID : this.props.UUID,
      token: this.props.token,
      reciientUUID: "UUID",
      isLoaded: false,
      isCreateLogDialogOpen: false,
      createLogButtonText: "Create new Log",
      posts: [],
      isInformationOpen: false,
      chosenIndex: null,
      logs: [],
      usernames: [],
      showUsernames: true,
      showUserLog: false,
      visitedUser: "",
      SuccessfulSave: false,
    };
  }

  changeCreateLogButtonText(){
    if(this.state.createLogButtonText === "Create new Log"){
        this.state.createLogButtonText= "Close dialog";
    }else{
      this.state.createLogButtonText = "Create new Log";
    }
  }

  openCreateLogDialog(){
    this.changeCreateLogButtonText();
    this.setState({
      isCreateLogDialogOpen: !this.state.isCreateLogDialogOpen
    })
  }

  openInformation(index){

    if(this.state.isInformationOpen && this.chosenIndex !== index){
      this.state.isInformationOpen = false;
    }
    this.chosenIndex = index;
    this.setState({
      isInformationOpen: !this.state.isInformationOpen
    })
  }

  goBack(){
    this.setState({showUsernames: false, showUserLog: false})
    this.setState({
      showUsernames: !this.state.showUsernames
    })
  }

  submitData(input, title){
    console.log(input + title);

    var tmp = this.state.logs;
    tmp[0]=input;
    tmp[1]=title;

    this.state.logs = tmp;
    console.log("mesag= "+ this.state.logs);
    fetch("http://localhost:9092/demo/addLog?message=" + this.state.logs[0] + '&title=' + this.state.logs[1] + "&uuid=" + this.state.UUID + "&reciever=" + this.state.reciientUUID,{
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + this.state.token, 'Access-Control-Allow-Origin': true, }
    })
    .then(
        // handle the result
        (result) => {
          this.setState({SuccessfulSave: true});
        },

        // Handle error
        (error) => {
            this.setState({
                error
            })
        },
    )
    this.props.setUUID(this.state.UUID);
  }



  componentDidMount() {
    /*Collects data from Springboot */
    this.setState({isLoaded: false});
    this.getUsernames();
}

  getUsernames(){
    console.log(this.state.UUID);
    fetch("http://localhost:9092/demo/usernames?uuid=" + this.state.UUID,{
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + this.state.token, 'Access-Control-Allow-Origin': true, }
    })
    .then( response => response.json())
    .then(
        // handle the result
        (result) => {
            this.setState({
                isLoaded: true,
                usernames: result,
            });
        },

        // Handle error
        (error) => {
            this.setState({
                isLoaded: true,
                error
            })
        },
    )
    this.props.setUUID(this.state.UUID);
  }

  getLog(uuid, username){
    console.log(this.UUID, username);
    this.setState({showUsernames: false, showUserLog: true, visitedUser: username, reciientUUID: uuid})
    fetch("http://localhost:9092/demo/resultVisitorLogs?uuid=" + this.state.UUID + "&visitUuid=" + uuid,{
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + this.state.token, 'Access-Control-Allow-Origin': true, }
    })
    .then( response => response.json())
    .then(
        // handle the result
        (result) => {
            this.setState({
                isLoaded: true,
                posts: result,
            });
        },

        // Handle error
        (error) => {
            this.setState({
                isLoaded: true,
                error
            })
        },
    )
    this.props.setUUID(this.state.UUID);
  }


  render(){
      const {isLoaded, posts, usernames} = this.state;
      if (!isLoaded) {
          return <div>Loading ...</div>
      }
      else{
        return (
          <div class = "containerUserLogs">

          {this.state.showUsernames?

            <div><strong class="fontSizer">Users</strong>
              <div>
              {
                  usernames.map((item)=>
                  <div class="startRowUserLogs" value={item.uuid} onClick={(e,f)=>this.getLog(item.uuid, item.username)}>{item.username}</div>
                )
              }
              </div>
            </div>
          :null}

          {this.state.showUserLog?
            <div>
            <button class="btn btn-dark lefty"  onClick ={()=> this.goBack()}>←</button>
            <h1>You're visiting {this.state.visitedUser}</h1>
            {
            posts.map((item, index)=>
            <div class = "rowUserLogs">
              <div class = "rowUserLogs rowHover" onClick = {() => this.openInformation(index)}>
                <div class = "colUserLogs">
                  <p className="columnUserLogText"><strong>{index + 1}. Sender: </strong>{item.user_UUID }</p>
                </div>
              </div>

              {this.state.isInformationOpen && this.chosenIndex == index?
              <div class = "rowUserLogs">
                <div class = "rowUserLogs">
                  <div class = "colUserLogs">
                    <p className="columnUserLogText">Recipient: {item.recipient_UUID}</p>
                  </div>
                </div>
              <div class = "rowUserLogs">
                <div class = "colUserLogs">
                  <p className="columnUserLogText">Title: {item.title}</p>
                </div>
              </div>
              {item.data?
                <Chart posts={item.data.split(",")} type={item.type}/>
              :null}
              <div class = "rowUserLogs">
                <div class = "colUserLogs">
                  <p className="columnUserLogText">{item.description}</p>
                </div>
              </div>

              <div class = "rowUserLogs">
                <div class = "colUserLogs">
                  <p className="columnUserLogText">{item._date}</p>
                </div>
              </div>

              <div class = "rowDIV"/>
            </div>
              :null}
          </div>
            )
            }
            <button class="btn btn-dark" onClick = {() => this.openCreateLogDialog()} variant="dark">
              {this.state.createLogButtonText}
            </button>
          </div>
        :null }

            {this.state.isCreateLogDialogOpen?
              <div class = "createLogWindow">
                <Form>
                   <Form.Group>
                    <Form.Label for="exampleInputEmail1">Title</Form.Label>
                    <textArea class="form-control" id="logTitle" aria-describedby="emailHelp" placeholder="Enter title"/>
                   </Form.Group>

                   <Form.Group>
                    <Form.Label for="exampleInputEmail1">Message</Form.Label>
                    <textArea class="form-control" id="logMessage" aria-describedby="emailHelp" placeholder="Enter text"/>
                   </Form.Group>

                    <button type="submit" class="btn btn-dark" onClick ={(e,f)=> this.submitData(document.getElementById('logMessage').value, document.getElementById('logTitle').value)} variant="dark">Submit</button>
                </Form>
              </div>
            :null}

            <footer class = "page-footer font-small blue ">
              <Card className = "footer" variant="none">
              {
                this.state.SuccessfulSave?
                <div class="alert alert-success" className="alert-green" role="alert"> Succesful entry!
                  <button class="btn btn-dark" align = "center" onClick ={()=>this.setState({SuccessfulSave : false})}>Ok</button>
                </div>
                :null
              }
              </Card>
            </footer>

          </div>
          );
        }
      }
    }
export default UserLogs;
