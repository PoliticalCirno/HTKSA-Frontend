import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/sports/soccer", label: "Soccer" },
  { to: "/sports/basketball", label: "Basketball" },
  { to: "/sports/baseball", label: "Baseball" },
  { to: "/sports/hockey", label: "Hockey" },
  { to: "/cart", label: "Cart" },
  { to: "/profile", label: "Profile" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">HTKSA</Link>

        {/* Mobile toggle */}
        <button
          className="burger"
          aria-label="Toggle menu"
          onClick={() => setOpen(v => !v)}
        >
          ☰
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <ul className="nav-list">
            {links.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
