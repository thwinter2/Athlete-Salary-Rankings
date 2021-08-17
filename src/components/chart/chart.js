import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import './Chart.css';
import Chart from "react-google-charts";

export default class PlayersChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      colleges: [],
      teams: [],
      listData: 'Players',
      chartData: [],
      ascSalary: false,
      ascEarnings: false,
    };
    this.handleEarningsClick = this.handleEarningsClick.bind(this);
    this.handleSalaryClick = this.handleSalaryClick.bind(this);
    this.setSortedData = this.setSortedData.bind(this);
    this.setListData = this.setListData.bind(this);
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
        this.setState({ascSalary: !this.state.ascSalary});
      })

      axios.get('http://localhost:5000/colleges')
      .then(response => {
        this.setState({ colleges: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  setListData(event) {
    this.setState({listData:event.target.value});
  }

  setSortedData(sortBy) {
    this.setState({players:this.getSortedData(sortBy)});
    this.setState({chartData:this.setChartData(sortBy)});
  }

  setChartData(sortBy) {
    var chartData = [[
      {label: 'Name', type: 'string'},
      {label: sortBy, type:'number'},
      {role:'annotation'},
      {type:'string', role:'tooltip', p:{html:true}},
      {role:'style'}
    ]];
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
        `${player.fullName}`,
        sortProperty,
        annotation,
        `<img src=${player.headshot.href} alt=${player.headshot.alt} width="100" height="75" className="center"> <br><b>${player.fullName}</b> ${annotation}`,
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
            return a.contracts[0].salary - b.contracts[0].salary;
          }
          return b.contracts[0].salary - a.contracts[0].salary;
        case 'Earnings':
          if (this.state.ascEarnings) {
            return a.careerEarnings - b.careerEarnings;
          }
          return b.careerEarnings - a.careerEarnings;
        default:
          return
      }
    });
    return dataToSort;
  }

  handleSalaryClick(){
    this.setState({ascSalary: !this.state.ascSalary});
    this.setState({ascEarnings: false});
    this.setSortedData('Salary');
  }

  handleEarningsClick(){
    this.setState({ascEarnings: !this.state.ascEarnings});
    this.setState({ascSalary: false});
    this.setSortedData('Earnings');
  }

  render() {
    return (
      <div>
        <h3>Players</h3>
        <div className='arrowContainer'>
          {/* <img src='/images/blue-arrow.png' alt='Arrow' class={this.state.ascSalary ? '' : 'desc'}></img> */}
          <select defaultValue={this.state.listData} onChange={this.setListData}>
            <option value="Players">Players</option>
            <option value="Colleges">Colleges</option>
            <option value="Teams">Teams</option>
          </select>
          <button onClick={this.handleSalaryClick}>Salary</button>
          <button onClick={this.handleEarningsClick}>Earnings</button>
        </div>
          <Chart 
          chartType='BarChart'
          loader={<div>Loading Chart</div>}
          data={this.state.chartData}
          options={{
            height: this.state.chartData.length * 45,
            // width: 1200,
            chartArea: {
              height: '100%',
              left: 200,
              right: 24,
              width: '100%'
            },
            fontSize: 12,
            hAxis: {minValue: 0},
            tooltip: {isHtml: true},
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