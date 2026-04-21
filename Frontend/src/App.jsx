import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import Login from "./Login";
import Leads from "./Leads";
import Properties from "./Properties";

function Navbar() {
  return (
    <div style={styles.navbar}>
      <div style={styles.brand}>🏠 CRM</div>
      <div style={styles.links}>
        <NavLink
          to="/leads"
          style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.activeLink : {}) })}
        >
          Leads
        </NavLink>
        <NavLink
          to="/properties"
          style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.activeLink : {}) })}
        >
          Properties
        </NavLink>
      </div>
    </div>
  );
}

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/"; // hide on login page

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/properties" element={<Properties />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    height: 56,
    background: "#111827",
    boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
  },
  brand: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 18,
    letterSpacing: 0.5,
    fontFamily: "system-ui, sans-serif",
  },
  links: {
    display: "flex",
    gap: 8,
  },
  link: {
    color: "#9CA3AF",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
    padding: "6px 14px",
    borderRadius: 8,
    fontFamily: "system-ui, sans-serif",
    transition: "background 0.15s",
  },
  activeLink: {
    color: "#fff",
    background: "#374151",
  },
};

export default App;
