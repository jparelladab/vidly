
// import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Component } from 'react';

class Navbar extends Component{
  render() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Vidly</Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            {/* Link component, prevents page reloading and changes the url. Then the route component renders the corresponding component */}
            <NavLink className="nav-link" to="/movies">Movies</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">Customers</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
}

export default Navbar;
