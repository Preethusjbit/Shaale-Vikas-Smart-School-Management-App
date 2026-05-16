import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { School, LayoutDashboard, Award, Settings } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import HallOfFame from './pages/HallOfFame';

function App() {
  const location = useLocation();

  const NavLink = ({ to, icon: Icon, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          color: isActive ? 'var(--primary)' : 'var(--text-muted)',
          backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
          fontWeight: isActive ? '600' : '500',
          transition: 'var(--transition)'
        }}
      >
        <Icon size={18} />
        <span className="hidden sm:inline">{children}</span>
      </Link>
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="container flex items-center justify-between">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
            <School size={28} color="var(--primary)" />
            <h1 style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.025em' }}>Shaale-Vikas</h1>
          </Link>
          
          <nav style={{ display: 'flex', gap: '0.5rem' }}>
            <NavLink to="/" icon={LayoutDashboard}>Needs</NavLink>
            <NavLink to="/hall-of-fame" icon={Award}>Hall of Fame</NavLink>
            <NavLink to="/admin" icon={Settings}>Admin</NavLink>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hall-of-fame" element={<HallOfFame />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
