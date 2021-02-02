import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              Entertainme
            </Link>            
            <div className="navbar-nav d-flex flex-row">
                <Link className="ml-2 mr-2" to={"/favorites"}>Favorites</Link> |
                <Link className="ml-2 mr-2" to={"/addMovie"}>+ Movie</Link> |
                <Link className="ml-2 mr-2" to={"/addSerie"}>+ Serie</Link>
              </div>
          </div>
        </nav>
      );
    }
