import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Award, IndianRupee, Clock } from 'lucide-react';

const HallOfFame = () => {
  const { donors, needs } = useAppContext();

  // Sort donors by most recent
  const sortedDonors = [...donors].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // Calculate total impact
  const totalRaised = donors.reduce((acc, curr) => acc + curr.amount, 0);

  const getNeedName = (needId) => {
    const need = needs.find(n => n.id === needId);
    return need ? need.title : 'Unknown Need';
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Award size={48} color="var(--accent)" style={{ margin: '0 auto 1rem auto' }} />
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Donor Hall of Fame</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Celebrating the alumni who are giving back. Your contributions are building a better future for the next generation.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: '1 1 300px', padding: '2rem', textAlign: 'center', backgroundColor: 'var(--primary)', color: 'white' }}>
          <h3 style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '0.5rem' }}>Total Alumni Impact</h3>
          <div style={{ fontSize: '3rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
            <IndianRupee size={32} /> {totalRaised.toLocaleString()}
          </div>
          <p style={{ opacity: 0.8, marginTop: '0.5rem' }}>Pledged across {donors.length} donations</p>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Recent Pledges</h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          {sortedDonors.map((donor, index) => (
            <div key={donor.id} className="card" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem', transition: 'var(--transition)' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: 'var(--radius-full)', 
                backgroundColor: index === 0 ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-color)', 
                color: index === 0 ? 'var(--accent)' : 'var(--text-muted)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                marginRight: '1.5rem'
              }}>
                {index === 0 ? <Award size={24} /> : `#${index + 1}`}
              </div>
              
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{donor.name}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Supported <strong style={{ color: 'var(--text-main)' }}>{getNeedName(donor.needId)}</strong>
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--secondary)' }}>
                  ₹{donor.amount.toLocaleString()}
                </div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                  <Clock size={12} /> {formatDate(donor.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {sortedDonors.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No pledges yet. Be the first to make a difference!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HallOfFame;
