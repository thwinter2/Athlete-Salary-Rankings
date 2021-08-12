import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import './players.css';

const Player = props => (
  <tr bgcolor={props.player.team.color}>
    <td>{<img src={props.player.headshot ? props.player.headshot.href : 'https://secure.espncdn.com/combiner/i?img=/i/headshots/nophoto.png'}
        alt={props.player.headshot ? props.player.headshot.alt : ''} height='75' width='100'></img>}
    </td>
    <td>{`${props.player.firstName} ${props.player.lastName}`}</td>
    <td>{props.player.team.displayName}</td>
    <td>
      {(props.player.birthPlace ? `${props.player.birthPlace.city}, ${(props.player.birthPlace.state ? 
        props.player.birthPlace.state : props.player.birthPlace.country)}` : '')}
    </td>
    <td>
      {(props.player.college ? props.player.college.name : '')}
    </td>
    <td>{props.player.displayCurrentSalary}</td>
    <td>{props.player.displayCareerEarnings}</td>
  </tr>
)

export default class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      colleges: [],
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
        this.setState({players:this.getSortedData('Earnings')});
        console.log(this.state.players[0])
      })

      axios.get('http://localhost:5000/colleges/')
      .then(response => {
        this.setState({ colleges: response.data })
      })
      .catch((error) => {
        console.log(error);
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
          return a.contracts[0].salary - b.contracts[0].salary;
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
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Headshot</th>
              <th>Name</th>
              <th>Team</th>
              <th>Hometown</th>
              <th>College</th>
              <th onClick={()=>this.setSortedData('Salary')}>Current Salary</th>
              <th onClick={()=>this.setSortedData('Earnings')}>Career Earnings</th>
            </tr>
          </thead>
          <tbody>
            { this.playerList() }
          </tbody>
        </table>
      </div>
    )
  }
}