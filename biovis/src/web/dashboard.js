import * as React from 'react';
import { Link } from "react-router-dom";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return( 
    <div>
    <h2>Dashboard</h2>
    <nav>
    <ul>
       <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/signup">Sign up</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/adminLogin">Admin Login</Link>
      </li>
    </ul>
  </nav>
  </div>)
  }
}

export default Dashboard;
