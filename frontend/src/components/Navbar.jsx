import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="navbar">
      <h1 className="logo">STREAMBOX</h1>
      <div className="nav-right">
        <span className="hello">Hi, {user.name}</span>
        <button className="btn-ghost" onClick={logout}>Sign out</button>
      </div>
    </header>
  );
}
