import React, { Component } from "react";
import {Button, Form, Card} from 'react-bootstrap';
import './css/Log.css';
import {Bar, Line, Pie} from 'react-chartjs-2';
import Chart from '../components/diagram/Chart';

class Log extends Component{
  constructor(props){
    super(props);
    this.state = {
      UUID : this.props.UUID,
      token: this.props.token,
      reciientUUID: "UUID",
      isLoaded: false,
      isCreateLogDialogOpen: false,
      chosenIndex: null,
      createLogButtonText: "Create new Log",
      posts: [],
      logs: [],
      usernames: [],
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

  submitData(input, title){
    var tmp = this.state.logs;
    tmp[0]=input;
    tmp[1]=title;

    this.state.logs = tmp;
    console.log("mesag= "+ this.state.logs);
    fetch("http://localhost:9092/demo/addLog?message=" + this.state.logs[0] + '&title=' + this.state.logs[1] + "&uuid=" + this.state.UUID + "&reciever=" + this.state.UUID,{
      method: 'POST',
      headers: {'Access-Control-Allow-Origin': true, 'Authorization': 'Bearer ' + this.state.token}
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
    this.getLog();
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

  componentDidMount() {
    /*Collects data from Springboot */
    this.setState({isLoaded: false});
    this.getLog();
    console.log("TOKEN I LOGS: " + this.state.token + " PROPS: " + this.props.token);
    fetch("http://localhost:9092/demo/usernames?uuid=" + this.state.uuid,{
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
    console.log(this.state.posts);
  }

  getLog(){
      console.log("TOKEN I LOGS: " + this.state.token);
    this.setState({showUsernames: false, showUserLog: true})
    fetch("http://localhost:9092/demo/resultLogs?uuid=" + this.state.UUID,{
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
          <div class = "containerlog">
            {
            posts.map((item, index)=>
            <div class = "row">

              <div class = "rowLog rowHover" onClick = {() => this.openInformation(index)}>
              <div class = "colLog">
                <p className="columnText">{index + 1}. Sender: {item.user_UUID }</p>
              </div>
            </div>

            {this.state.isInformationOpen && this.chosenIndex == index?

              <div class = "rowLog">
                <div class = "rowLog">
                  <div class = "colLog">
                    <p className="columnLogText">Recipient: {item.recipient_UUID}</p>
                  </div>
                </div>
                <div class = "rowLog">
                  <div class = "colLog">
                    <p className="columnLogText">{item.title}</p>
                  </div>
                </div>
                {item.data?
                  <Chart posts={item.data.split(",")} type={item.type}/>
                :null}
                <div class = "rowLog">
                  <div class = "colLog">
                    <p className="columnLogText">{item.description}</p>
                  </div>
                </div>
                <div class = "rowLog">
                  <div class = "colLog">
                    <p className="columnLogDateText">{item._date}</p>
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
                  <button class="btn btn-dark" align = "center" onClick ={()=>this.setState({SuccessfulSave : false})}> Ok</button>
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
export default Log;
