import React from 'react';
import './Board.css';
import io from 'socket.io-client';
import {Button, Form, Card, Modal} from 'react-bootstrap';

class Board extends React.Component
{
    timeout;
    socket = io.connect("http://localhost:5000");

    ctx;
    isDrawing = false;
    constructor(props){
        super(props);
        this.state = {
          UUID: this.props.UUID,
          token: this.props.token,
          loadedDataURL: "",
          modalImageLoader: false,
          imageNames: [],
          nameOfImage: "",
        };
        this.socket.on("canvas-data", function(data){
            var root = this;
            var interval = setInterval(function(){
              if(root.isDrawing){
                return;
              }
              root.isDrawing = true;
              clearInterval(interval);
              var image = new Image();
              var canvas = document.querySelector('#board');
              var ctx = canvas.getContext('2d');

              image.onload = function(){
                  ctx.drawImage(image, 0, 0);
                  root.isDrawing = false;
              };
              image.src = data;
            }, 200)
        })
    }

    drawToCanvas(){
      console.log(this.state.loadedDataURL);
      const canvas = document.getElementById('board');
      var context = canvas.getContext('2d');
      var img = new Image();
      img.onload = function(){
        context.drawImage(this,0,0);
      }
      img.src = this.state.loadedDataURL;
    }

    async loadCanvas(){
        console.log("TOKEN:A:A:A::A:A " + this.state.token);
      await fetch('http://localhost:8080/demo/loadImage?uuid=' + this.props.UUID + "&name=" + this.state.nameOfImage ,{
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + this.state.token, 'Access-Control-Allow-Origin': true, }
      })

        .then( response => response.json())
        .then(
          // handle the result
          (result) => {
            //console.log("Tjenis ");
            this.setState({loadedDataURL: result.nameOfImage, modalImageLoader: false});
            console.log(this.state.loadedDataURL);
          },

          // Handle error
          (error) => {
              this.setState({
                  error
              })
          },
      );
      this.drawToCanvas();
      this.props.setUUID(this.state.UUID);
      }

  saveCanvas(imageName){
  if(imageName.length > 0){

  const canvas = document.getElementById('board');
  var canvas64 = canvas.toDataURL();
  //canvas64 = JSON.stringify(canvas64);
  console.log(canvas64);
      fetch('http://localhost:8080/demo/saveImage?uuid=' + this.props.UUID + "&img=" + canvas64 + "&name=" + imageName ,{
        method: 'POST',
        headers: {'Authorization': 'Bearer ' + this.state.token, 'Access-Control-Allow-Origin': true, }
      })

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
      }
      else{
        alert("Please fill in name of the image");
      }
      this.props.setUUID(this.state.UUID);
  }

  async getImageNames(){
    console.log("TOKEN:A:A:A::A:A " + this.state.token);
    await fetch('http://localhost:8080/demo/images?uuid=' + this.props.UUID ,{
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + this.state.token, 'Access-Control-Allow-Origin': true, }
    })

        .then( response => response.json())
        .then(
          // handle the result
          (result) => {
            console.log(result);
            this.setState( { imageNames: result } );
            console.log(this.state.imageNames);
          },

          // Handle error
          (error) => {
              this.setState({
                  error
              })
          },
      );
      this.props.setUUID(this.state.UUID);
  }

  changeModalState(){
    this.getImageNames();
    this.setState({modalImageLoader: true});
  }

  changeImageState(nameOfImage){
    this.state.nameOfImage = nameOfImage;
  }

    componentDidMount(){
      this.drawOnCanvas();
    }

    componentWillReceiveProps(newProps){
        this.ctx.strokeStyle = newProps.color;
        this.ctx.lineWidth = newProps.size;
    }

    drawOnCanvas(){
        var canvas = document.querySelector('#board');
        this.ctx = canvas.getContext('2d');
        var ctx = this.ctx;

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        ctx.lineWidth = this.props.size;
        ctx.lineJoin  ='round';
        ctx.lineCap  = 'round';
        ctx.strokStyle = this.props.color;

        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        var root = this;
        var onPaint = function() {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();
            if(root.timeout != undefined){
              clearTimeout(root.timeout);
            }
            root.timeout = setTimeout(function(){
              var base64ImageData = canvas.toDataURL("image/png");
              root.socket.emit("canvas-data", base64ImageData);
            }, 1000)
        };
    }

    render(){
      const {isLoaded, imageNames} = this.state;
      return(
        <div class= "sketch" id = "sketch">
        {this.state.modalImageLoader?
          <Modal.Dialog>
              <Modal.Header closeButton onClick ={()=>this.setState({modalImageLoader: false})}>
                <Modal.Title>Load image</Modal.Title>
              </Modal.Header>

              <Modal.Footer>
              Which image would you like to load?
              <Form>
                <form>
                   <select class="custom-select my-1 mr-sm-2" onChange={(event) => this.changeImageState(event.target.value)}>
                     <option >Images</option>
                      {
                        imageNames.map((item)=>
                          <option value={item}>{item}</option>
                        )
                      }
                  </select>
                 </form>
                <button class="btn btn-dark" onClick ={()=> this.loadCanvas()}>Load</button>
              </Form>
                </Modal.Footer>
            </Modal.Dialog>
        :null}
          <canvas className = "board" id = "board"> </canvas>
          <footer class = "page-footer font-small blue ">
            <Card className = "footer" variant="none">
            {
              <div class="alert alert-success" className="alert-green" role="alert">
                <textArea class="form-control" id="imageName" aria-describedby="emailHelp" placeholder="Enter name"/>
                <button id="save" onClick = {() => this.saveCanvas(document.getElementById('imageName').value)}>Save</button>
                <button id="load" onClick = {() => this.changeModalState()}>Load</button>
              </div>
            }
            </Card>
          </footer>


        </div>

      )
    }
}

export default Board;
