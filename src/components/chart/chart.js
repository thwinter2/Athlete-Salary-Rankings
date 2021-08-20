import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import './Chart.css';
import Chart from 'react-google-charts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addYears } from 'date-fns';

export default class PlayersChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      colleges: [],
      teams: [],
      listData: [],
      chartData: [],
      listBy: 'Players',
      sortBy: 'Earnings',
      asc: 'false',
      date: new Date(),
      year: 2020,
    };
  
    this.setSortedData = this.setSortedData.bind(this);
    this.getSortedData = this.getSortedData.bind(this);
    this.handleChangeListBy = this.handleChangeListBy.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeSortDirection = this.handleChangeSortDirection.bind(this);
    this.handleChangeSortBy = this.handleChangeSortBy.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/players/NBA')
      .then(response => {
        this.setState({ players: response.data, listData: response.data})
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        this.setSortedData();
      })

      axios.get('http://localhost:5000/colleges')
      .then(response => {
        this.setState({ colleges: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleChangeListBy(event) {
    let listData;
    switch(event.target.value) {
      case 'Colleges':
        listData = this.state.colleges;
      break;
      case 'Teams':
        listData = this.state.teams;
      break;
      default:
        listData = this.state.players;
        break;
      }
    this.setState({listData: listData, listBy: event.target.value}, () => {
      this.setSortedData();
    });
  }

  setSortedData() {
    this.setState({listData:this.getSortedData()}, () => {
      this.setState({chartData:this.setChartData()});
    });
  }

  getSortedData() {
    let dataToSort = [];
    let year = this.state.year;

    switch (this.state.listBy) {
      case 'Colleges':
        dataToSort = this.state.colleges;
        break;
      case 'Teams':
        dataToSort = this.state.teams;
        break;
      default:
        dataToSort = this.state.players;
        break;
      }

    switch(this.state.sortBy) {
      case 'Salary':
        return dataToSort
        .filter(obj => typeof obj.contracts[year] !== 'undefined')
        .sort((a,b) => {
          return (this.state.asc === 'true') ? a.contracts[year].salaryNumber - b.contracts[year].salaryNumber : b.contracts[year].salaryNumber - a.contracts[year].salaryNumber;
        });
      case 'Earnings':
        return dataToSort.sort((a,b) => {
          return (this.state.asc === 'true') ? a.careerEarnings - b.careerEarnings : b.careerEarnings - a.careerEarnings;
        });
      default:
        return dataToSort;
    }
  }

  setChartData() {
    var chartData = [[
      {label: 'Name', type: 'string'},
      {label: this.state.sortBy, type:'number'},
      {role:'annotation'},
      {type:'string', role:'tooltip', p:{html:true}},
      {role:'style'}
    ]];
    let name;
    let sortProperty;
    let annotation;
    let tooltip;
    let style;
    let year = this.state.year;

    for (let datum of this.state.listData){
      switch(this.state.sortBy){
        case 'Earnings':
          sortProperty = datum.careerEarnings;
          annotation = datum.displayCareerEarnings;
        break;
        case 'Salary':
          sortProperty = datum.contracts[year].salaryNumber;
          annotation = datum.contracts[year].salaryString;
        break;
        default:
        break;
      }
      if (sortProperty > 0) {
        switch(this.state.listBy){
          default:
            name = `${datum.fullName}`;
            tooltip = `<img src=${datum.headshot.href} alt=${datum.headshot.alt} width='100' height='75' className='center'> <br><b>${datum.fullName}</b> ${annotation}`;
            style = datum.team.color;
          break;
          case 'Colleges':
            name = `${datum.location}`;
            if (datum.logos) {
              tooltip = `<img src=${datum.logos[0].href} alt=${datum.logos[0].alt} width='100' height='100' className='center'> <br><b>${datum.displayName}</b> ${annotation}`;
            } else {
              tooltip = `${datum.displayName}</b> ${annotation}`;}
            style = datum.color;
          break;
        }
        chartData.push([
          name,
          sortProperty,
          annotation,
          tooltip,
          style,
        ])
      }
    }
    return chartData;
  }
  
  handleChangeYear(date){
    this.setState({date: date, year: date.getFullYear()}, () => {
      this.setSortedData();
    });
  }

  handleChangeSortDirection(event){
    if(event.target.checked) {
      this.setState({asc: event.target.value}, () => {
        this.setSortedData();
      });
    }
  }

  handleChangeSortBy(event) {
    this.setState({sortBy: event.target.value}, () => {
      this.setSortedData();
    })
  }

  render() {
    return (
      <div>
        <h3>{this.state.listBy}</h3>
        <div className='arrowContainer'>
          {/* <img src='/images/blue-arrow.png' alt='Arrow' class={this.state.ascSalary ? '' : 'desc'}></img> */}
          <select defaultValue='Players' onChange={this.handleChangeListBy}>
            <option value='Players'>Players</option>
            <option value='Colleges'>Colleges</option>
            <option value='Teams'>Teams</option>
          </select>
          <div>
            {this.state.sortBy !== 'Earnings' ?
            <DatePicker
              selected={this.state.date}
              onChange={(date) => this.handleChangeYear(date)}
              showYearPicker
              dateFormat='yyyy'
              maxDate={addYears(new Date(), 1)}
              showPopperArrow={false}
            />
            : <br/>
          }
          </div>
          <div>
            <input type='radio' id='desc' name='direction' value='false' defaultChecked onChange={this.handleChangeSortDirection}/>
            <label for='desc'>Descending</label>
          </div>
          <div>
            <input type='radio' id='asc' name='direction' value='true' onChange={this.handleChangeSortDirection}/>
            <label for='asc'>Ascending</label>
          </div>
          <div>
            <select defaultValue='Earnings' onChange={this.handleChangeSortBy}>
              <option value='Earnings'>Earnings</option>
              <option value='Salary'>Salary</option>
            </select>
          </div>
        </div>
        <div>
          <Chart 
            chartType='BarChart'
            loader={<div>Loading Chart</div>}
            data={this.state.chartData}
            options={{
              height: this.state.chartData.length * 45,
              chartArea: {
                height: '100%',
                left: 200,
                right: 24,
                width: '100%'
              },
              fontSize: 12,
              hAxis: {minValue: 0},
              tooltip: {trigger: 'selection', isHtml: true},
              legend: {position: 'none'},
              animation: {
                startup: true,
                easing: 'linear',
                duration: 1000,
              },
              annotations: {
                textStyle: {
                  fontSize: 14
                },
              },
            }}
          />
        </div>
      </div>
    )
  }
}