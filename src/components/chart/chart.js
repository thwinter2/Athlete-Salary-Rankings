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
      ascSalary: false,
      ascEarnings: false,
    };
    this.handleEarningsClick = this.handleEarningsClick.bind(this);
    this.handleSalaryClick = this.handleSalaryClick.bind(this);
    this.setSortedData = this.setSortedData.bind(this);
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
        this.setSortedData('Salary');
      })
  }

  setSortedData(sortBy) {
    this.setState({players:this.getSortedData(sortBy)});
    this.setState({chartData:this.setChartData(sortBy)});
    console.log(this.state.ascSalary);
  }

  setChartData(sortBy) {
    var chartData = [['Name', {label: sortBy,type:'number'},{role:'annotation'},{role:'style'}]];
    let sortProperty;
    let annotation;
    for (let player of this.state.players){
      switch(sortBy){
        case 'Earnings':
          sortProperty = player.careerEarnings;
          annotation = player.displayCareerEarnings;
          break;
        case 'Salary':
          sortProperty = player.contracts[0].salary;
          annotation = player.displayCurrentSalary;
          break;
        default:
          break;
      }
      chartData.push([
        `${player.firstName} ${player.lastName}`,
        sortProperty,
        annotation,
        player.team.color,
      ])
    }
    return chartData;
  }
  
  getSortedData(sortBy) {
    let dataToSort = this.state.players;

    dataToSort.sort((a,b) => {
      switch(sortBy) {
        case 'Salary':
          if (this.state.ascSalary) {
            return b.contracts[0].salary - a.contracts[0].salary;
          }
          return a.contracts[0].salary - b.contracts[0].salary;
        case 'Earnings':
          if (this.state.ascEarnings) {
            return b.careerEarnings - a.careerEarnings;
          }
          return a.careerEarnings - b.careerEarnings;
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

  handleSalaryClick(){
    this.setState({ascSalary: !this.state.ascSalary});
    this.setSortedData('Salary');
  }

  handleEarningsClick(){
    this.setState({ascSalary: !this.state.ascEarnings});
    this.setSortedData('Earnings');
  }

  render() {
    return (
      <div>
        <h3>NBA Players</h3>
        <div className='arrowContainer'>
          <img src='/images/blue-arrow.png' alt='Arrow' class={this.state.ascSalary ? '' : 'desc'}></img>
          <button onClick={this.handleSalaryClick}>Salary</button>
          <button onClick={this.handleEarningsClick}>Earnings</button>
        </div>
          <Chart 
          chartType='BarChart'
          loader={<div>Loading Chart</div>}
          data={this.state.chartData}
          options={{
            height: this.state.chartData.length * 45,
            width: 1200,
            chartArea: {height: '100%'},
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