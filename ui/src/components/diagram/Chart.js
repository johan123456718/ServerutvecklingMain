import React, {Component} from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{

    constructor(props){
      super(props);
      this.state = {
        data:this.props.countdata,
        posts:this.props.posts,
        type: this.props.type,
        chartData: {
         labels: ['Monday','Thuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
       datasets: [
         {
           label: ['Legends'],
           data: this.props.posts,
           backgroundColor: [
             'rgba(255, 99, 132, 0.6)',
             'rgba(54, 162, 235, 0.6)',
             'rgba(255, 206, 86, 0.6)',
             'rgba(255, 99, 132, 0.1)',
             'rgba(54, 162, 255, 0.6)',
             'rgba(255, 45, 132, 0.6)',
             'rgba(255, 23, 72, 0.6)',
           ]
         }
       ]
       }
      };
      console.log(this.props.posts + " type: " + this.props.type);
    }


    render()
    {
      const {error, posts} = this.state;
      if(error){
          return <div>Error in loading </div>
      }
      else
      {
        return(
          <div class="container">
          {this.state.type==='Bar'?
            <div>
            <Bar
              data = {this.state.chartData}
              width = {100}
              height = {50}
              options = {{
                  title: {
                    display: true,
                    text: "Saved Images Per Day",
                    fontSize: 25
                  },
                  legend: {
                    display: true,
                    position: 'bottom'
                  }
              }}
            />
            </div>
          :null}
          {this.state.type==='Line'?
            <div>
            <Line
              data = {this.state.chartData}
              width = {100}
              height = {50}
              options = {{
                  title: {
                    display: true,
                    text: "Saved Images Per Day",
                    fontSize: 25
                  },
                  legend: {
                    display: true,
                    position: 'bottom'
                  }
              }}
            />
            </div>
          :null}
          {this.state.type==='Pie'?
            <div>
            <Pie
              data = {this.state.chartData}
              width = {100}
              height = {50}
              options = {{
                  title: {
                    display: true,
                    text: "Saved Images Per Day",
                    fontSize: 25
                  },
                  legend: {
                    display: true,
                    position: 'bottom'
                  }
              }}
            />
            </div>
          :null}

          </div>
        );
      }
    }
  }
export default Chart;
