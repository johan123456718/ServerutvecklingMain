import React, { Component } from "react";
import {FormControl, Form, Button, Card, ButtonGroup} from 'react-bootstrap';
import './css/Messages.css';

class Messages extends Component{
  constructor(props){
    super(props);
    this.new_message = React.createRef();
    this.state = {
      isLoaded: false,
      isCreateLogDialogOpen: false,
      inputChanged: false,
      UUID: this.props.UUID,
      token: this.props.token,
      reciientUUID: this.props.recipiendUUID,
      posts: [],
      usernames: [],
      senders: [],
      message: "",
      reciever: "",
      showMessagesFrom: false,
      showSenders: true,
      SuccessfulSave: false,
    };
  }

  changeInputState(){
    this.setState({inputChanged: true});
  }
  changeRecieverState(recieverName){
    this.state.reciever = recieverName;
  }

  showSenders(){
    this.setState({showSenders: false, showMessagesFrom: false});
    this.setState({
      showSenders: !this.state.showSenders
    })
  }

  showMessagesFrom(){
    this.setState({showMessagesFrom: false, showSenders: false});
    this.setState({
      showMessagesFrom: !this.state.showMessagesFrom
    })
  }

   submitData(input){
    this.state.message = input;
    console.log(this.reciever);
    console.log(this.state.reciever);
    fetch("http://localhost:9093/demo/addMessage?message=" + this.state.message+ "&uuid=" + this.state.UUID + "&reciever=" + this.state.reciever,{
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + this.state.token, 'Access-Control-Allow-Origin': true, }
    })
    .then(
        // handle the result
        (result) => {
            this.getSenders();
            this.showSenders();
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

  getMessages(uuid){
    console.log(uuid);
    this.setState({isLoaded: false, reciever: uuid});
    console.log(this.state.reciever);
    fetch("http://localhost:9093/demo/messages?uuid=" + this.state.UUID +"&sender=" + uuid,{
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

            this.showMessagesFrom();
        },

        // Handle error
        (error) => {
            this.setState({
                isLoaded: true,
                error
            })
        },
    )
  }


  componentDidMount() {
    /*Collects data from Springboot */
    this.setState({isLoaded: false});
   fetch("http://localhost:9093/demo/usernames?uuid=" + this.state.UUID,{
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
    this.getSenders();
  }

  getSenders(){
      this.setState({isLoaded: false});
       fetch("http://localhost:9093/demo/senders?uuid=" + this.state.UUID,{
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + this.state.token, 'Access-Control-Allow-Origin': true, }
      })
      .then( response => response.json())
      .then(
          // handle the result
          (result) => {
              this.setState({
                  isLoaded: true,
                  senders: result,
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
  }

  render(){
      const {isLoaded, posts, usernames, senders} = this.state;
      if (!isLoaded) {
          return <div>Loading ...</div>
      }
      else{
        return (
          <div class = "container">

          {this.state.showSenders?
            <div><h1> Recived messages from</h1>
            {
            senders.map((item)=>
            <div class = "row-message">
                <div class = "col-messageFromUser" onClick={(e)=>this.getMessages(item.uuid)}>
                  <a value={item.uuid} className = "itemText-message">{item.username}</a>
                </div>
            </div>
          )
          }
          <div class = "createMessageInputWindow">
            <Form>
              <form>
                 <select class="custom-select my-1 mr-sm-2" onChange={(event) => this.changeRecieverState(event.target.value)}>
                   <option >username</option>
                    {
                      usernames.map((item)=>
                        <option value={item.uuid}>{item.username}</option>
                      )
                    }
                </select>
               </form>
              <textArea class="messageTextArea" id="messageInput" ref={this.new_message} onChange ={()=> this.changeInputState()} placeholder="Enter message"/>
              <button class="btn btn-dark" onClick ={(e)=> this.submitData(document.getElementById('messageInput').value)}>Submit</button>
            </Form>
          </div>
        </div>
          :null
        }

          {this.state.showMessagesFrom?
            <div>
            <button class="btn btn-dark lefty"  onClick ={()=> this.showSenders()}>←</button>
            {
              posts.map((item)=>
              <div class = "row">
                <div class = "col-date">
                  <p className="columnText"> {item._date}</p>
                </div>
                <div class = "col">
                  <p className="columnText">From: </p>
                  <p className = "itemText">{ item.user_UUID }</p>
                  <p className="rowText"> {item.body} </p>
                </div>
              </div>
              )
            }
            <div class = "createMessageInputWindow">
              <Form>
                  <textArea class="messageTextArea" id="messageInput" ref={this.new_message} onChange ={()=> this.changeInputState()} placeholder="Answer"/>
                  <button class="btn btn-dark" onClick ={(e)=> this.submitData(document.getElementById('messageInput').value)}>Submit</button>
              </Form>
            </div>
          </div>
          :null
          }

          <footer class = "page-footer font-small blue ">
            <Card className = "footer" variant="none">
            {
              this.state.SuccessfulSave?
              <div class="alert alert-success" className="alert-green" role="alert">Message sent!
                <button class="btn btn-dark" align = "center" onClick ={()=>this.setState({SuccessfulSave : false})}>Ok</button>
              </div>
              :null
            }
            </Card>
          </footer>

          </div> /* Stänger container*/
          );

        }

      }
    }
export default Messages;
