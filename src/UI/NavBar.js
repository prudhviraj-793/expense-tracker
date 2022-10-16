import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav">
      <ul>
        <li>
          <NavLink to='/'>
            <h3>Expense Tracker</h3>
          </NavLink>
        </li>
        <li>
          <NavLink to='/home'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/products'>Products</NavLink>
        </li>
        <li>
          <NavLink to='/aboutUs'>About Us</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
