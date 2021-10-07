import React, {Component } from 'react';
import {Button, Form, FormGroup, ButtonGroup} from 'react-bootstrap';
import {Bar, Line, Pie} from 'react-chartjs-2';
import './css/Vertx.css';
import Chart from '../components/diagram/Chart';

class Vertx extends Component {
  constructor(props){
    super(props);
    this.state = { // (2)
      isLoaded: false,
      types: ['Line', 'Bar', 'Pie'],
      posts: [],
      uuid : this.props.UUID,
      token: this.props.token,
      type : 'Line',
    }
  }


 componentDidMount() { // (5)
   fetch("http://localhost:8888/api/test/" + this.state.uuid,{
       method: 'GET',
     })
       .then(response => response.json())
       .then(
           // handle the result
           (result) => {
               this.setState({
                   isLoaded: true,
                   posts: result,
                   data: result,
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
      this.props.setUUID(this.state.uuid);
  }

  saveChart(){

    const dataString = this.state.posts.join(", ");
    console.log(dataString);
    fetch("http://localhost:9092/demo/addChart?uuid=" + this.state.uuid
    + "&type=" + this.state.type
    + "&data="+ dataString,{
      method: 'POST',
      crossDomain: true,
      headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST','Authorization': 'Bearer ' + this.state.token,}
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

    this.props.setUUID(this.state.uuid);

  }

  changeTypeState(type){
    this.setState({type: type, isLoaded: false});
  }

  changeLoadedState(){
    this.setState({isLoaded: true});
  }

  render(){
  /*Error checker */
  const {error, posts, chartData, isLoaded, types} = this.state;
  if(error){
      return <div>Error in loading </div>
  }else{
      return(
        <div class="container-vertx">
          <Form>
            <form>
               <select class="custom-select my-1 mr-sm-2" onChange={(event) => this.changeTypeState(event.target.value)}>
                 <option >Types</option>
                  {
                    types.map((item)=>
                      <option value={item}>{item}</option>
                    )
                  }
              </select>
             </form>
            <button class="btn btn-dark" onClick ={() => this.changeLoadedState()}>Generate chart</button>

          </Form>
  {this.state.isLoaded?
    <div>
    <Chart chartData={this.state.chartData} posts={this.state.posts} type={this.state.type}/>
    <button class="btn btn-dark" onClick ={() => this.saveChart()}>Publish to log</button>
    </div>
  :null}

</div>
      );
    }
  }
}

export default Vertx;
