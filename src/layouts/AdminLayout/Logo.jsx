import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink className="nav-logo" to="/">
      <h2>CYBERMY</h2>
    </NavLink>
  );
}
