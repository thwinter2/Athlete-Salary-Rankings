import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Update DB</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
                <Link to="/teams/nba/add-all" className="nav-link">Add NBA Teams</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}