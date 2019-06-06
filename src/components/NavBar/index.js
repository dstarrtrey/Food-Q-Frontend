import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import angryfish3 from '../angryfish3.png';
import angryfish1 from '../angryfish1.jpg';
import angryfish2 from '../angryfish2.jpg';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item

// Need to change the icons to more practical ones. Home (A House or Even the current icon is fine) -- Menu(A Resturant Menu or Sushi Menu) -- Waitlist(A Clock or Watch)
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbarar justify-content-end ml-auto">
      <div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              to="/"
              className={
                window.location.pathname === "/" || window.location.pathname === "/Home"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
            <img className="angryfish3" src={angryfish3} alt="angryfish3" />
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Menu"
              className={window.location.pathname === "/Menu" ? "nav-link active" : "nav-link"}
            >
              <img className="angryfish1" src={angryfish1} alt="angryfish1" />
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/ClientList"
              className={window.location.pathname === "/ClientList" ? "nav-link active" : "nav-link"}
            >
              <img className="angryfish2" src={angryfish2} alt="angryfish2" />
            </Link>
            
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
