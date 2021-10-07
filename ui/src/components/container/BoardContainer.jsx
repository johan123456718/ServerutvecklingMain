import React from 'react';
import Board from '../board/Board';
import './BoardContainer.css';

class BoardContainer extends React.Component
{
    constructor(props){
      super(props);

      this.state = {
          color: "#000000",
          size: "5",
          UUID : this.props.UUID,
          token: this.props.token,
      };
    }

    changeColor(params){
      this.setState({
        color: params.target.value
      })
    }

    changeSize(params){
      this.setState({
        size: params.target.value
      })
    }

    render(){
      return(
        <div className= "boardContainer">
        <div className="moveDown" ></div>
            <div className = "board-middle-container">
            <div className = "tool-section">

              <div className= "color-picker-container">
                <input type = "color" value ={this.state.color} onChange= {this.changeColor.bind(this)}/>
              </div>

              <div className= "brush-picker-container">
                <select value = {this.state.size}  onChange= {this.changeSize.bind(this)}>
                  <option>5 </option>
                  <option>10 </option>
                  <option>15 </option>
                  <option>20 </option>
                  <option>25 </option>
                  <option>30 </option>
                </select>
              </div>
            </div>
                <Board token={this.state.token} color={this.state.color} size={this.state.size} UUID={this.state.UUID} setUUID={(e) => this.props.setUUID(e)}></Board>
            </div>
        </div>
      )
    }
}

export default BoardContainer;
