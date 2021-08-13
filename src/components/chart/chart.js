import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import './chart.css';
import Chart from "react-google-charts";

const Player = props => (
  [`${props.player.firstName} ${props.player.lastName}`,props.player.displayCareerEarnings]
)

export default class PlayersChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      colleges: [],
      chartData: [],
    };
    // this.sortByEarnings = this.sortByEarnings.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/players/NBA')
      .then(response => {
        this.setState({ players: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        this.setSortedData('Earnings');
        var chartData = [['Name', {label: 'Earnings',type:'number'},{role:'annotation'},{role:'style'}]];
        for (let player of this.state.players){
          chartData.push([
            `${player.firstName} ${player.lastName}`,
            player.careerEarnings,
            player.displayCareerEarnings,
            player.team.color,
          ])
        }
        this.setState({chartData: chartData});
        console.log(this.state);
      })
  }

  setSortedData(sortBy) {
    this.setState({players:this.getSortedData(sortBy)});
  }
  
  getSortedData(sortBy) {
    let dataToSort = this.state.players;

    dataToSort.sort((a,b) => {
      switch(sortBy) {
        case 'Salary':
          return b.contracts[0].salary - a.contracts[0].salary;
        case 'Earnings':
          return b.careerEarnings - a.careerEarnings;
        default:
          return
      }
    });
    return dataToSort;
  }

  playerList() {
    return this.state.players.map(currentPlayer => {
      return <Player player = {currentPlayer} key={currentPlayer._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>NBA Players</h3>
        {/* <button onClick={this.setSortedData('Salary')}>Salary</button> */}
        <button>Earnings</button>
          <Chart 
          // chartArea={this.state.players.length * 3000}
          chartType='BarChart'
          loader={<div>Loading Chart</div>}
          data={this.state.chartData}
          options={{
            height: this.state.chartData.length * 40,
            width: 1200,
            // chartArea: {height: this.state.players.length * 40},
            fontSize: 12,
            hAxis: {minValue: 0},
            title: 'NBA Career Earnings',
            legend: {position: 'none'},
            animation: {
              startup: true,
              easing: 'linear',
              duration: 1000,
            },
            annotations: {
              textStyle: {
                fontSize: 14
              }
            }
          }}
          />
      </div>
    )
  }
}