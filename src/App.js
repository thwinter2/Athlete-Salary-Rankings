import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from "./components/NavBar/Navbar";
import PlayersChart from "./components/Chart/Chart";
import "./App.css";

function App() {
 return (
   <Router>
    <div className="App">
      <Navbar />
      <br/>
      <Route path="/" exact component={PlayersChart} />
    </div>
   </Router>
 );
}
 
export default App;