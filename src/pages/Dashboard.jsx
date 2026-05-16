import React from 'react';
import { useAppContext } from '../context/AppContext';
import NeedCard from '../components/NeedCard';

const Dashboard = () => {
  const { needs } = useAppContext();

  const openNeeds = needs.filter(n => n.status === 'open');
  const fulfilledNeeds = needs.filter(n => n.status === 'fulfilled');

  return (
    <div className="container">
      <div style={{ marginBottom: '2.5rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>School Needs Dashboard</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
          Help us rebuild our rural schools. Browse the current priority micro-needs and pledge your support to make an immediate impact.
        </p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Urgent Needs <span className="badge badge-open">{openNeeds.length}</span>
          </h3>
        </div>
        
        {openNeeds.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {openNeeds.map(need => (
              <NeedCard key={need.id} need={need} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-color)' }}>
            <p style={{ color: 'var(--text-muted)' }}>All urgent needs have been fulfilled! Amazing job, Alumni.</p>
          </div>
        )}
      </div>

      {fulfilledNeeds.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
              Recently Fulfilled <span className="badge badge-fulfilled">{fulfilledNeeds.length}</span>
            </h3>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', opacity: 0.8 }}>
            {fulfilledNeeds.map(need => (
              <NeedCard key={need.id} need={need} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
