import React, { useState } from 'react';
import { IndianRupee, MapPin, Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const NeedCard = ({ need }) => {
  const { id, title, description, category, costEstimate, amountPledged, status, imageUrl } = need;
  const { pledgeSupport } = useAppContext();
  
  const [showPledgeForm, setShowPledgeForm] = useState(false);
  const [pledgeAmount, setPledgeAmount] = useState('');
  const [donorName, setDonorName] = useState('');

  const progress = Math.min(Math.round((amountPledged / costEstimate) * 100), 100);
  const isFulfilled = status === 'fulfilled';

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    if (pledgeAmount > 0) {
      pledgeSupport(id, donorName, pledgeAmount);
      setShowPledgeForm(false);
      setPledgeAmount('');
      setDonorName('');
    }
  };

  return (
    <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'relative', height: '200px', width: '100%', overflow: 'hidden' }}>
        <img 
          src={imageUrl} 
          alt={title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <span className={`badge ${isFulfilled ? 'badge-fulfilled' : 'badge-open'}`} style={{ backgroundColor: isFulfilled ? 'var(--secondary)' : 'var(--surface)', color: isFulfilled ? 'white' : 'var(--primary)' }}>
            {isFulfilled ? 'Fulfilled' : 'Needs Support'}
          </span>
        </div>
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <MapPin size={16} color="var(--text-light)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Govt High School, Shimoga • {category}</span>
        </div>
        
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>{description}</p>

        <div style={{ marginBottom: '1.5rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>₹{amountPledged.toLocaleString()} raised</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>of ₹{costEstimate.toLocaleString()} goal</span>
          </div>
          
          <div className="progress-container">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%`, backgroundColor: isFulfilled ? 'var(--secondary)' : 'var(--primary)' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>{progress}% Funded</span>
          </div>
        </div>

        {!isFulfilled && !showPledgeForm && (
          <button 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            onClick={() => setShowPledgeForm(true)}
          >
            <Heart size={18} />
            Pledge Support
          </button>
        )}

        {!isFulfilled && showPledgeForm && (
          <form onSubmit={handlePledgeSubmit} style={{ backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Make a Pledge</h4>
            <div className="input-group">
              <label className="input-label">Amount (₹)</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="e.g. 1000"
                value={pledgeAmount}
                onChange={(e) => setPledgeAmount(e.target.value)}
                required
                min="1"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Your Name (Optional)</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Anonymous Alumni"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Confirm</button>
              <button type="button" className="btn btn-outline" onClick={() => setShowPledgeForm(false)}>Cancel</button>
            </div>
          </form>
        )}

        {isFulfilled && (
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--secondary-hover)' }}>
            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Funded Completely!</strong>
            <span style={{ fontSize: '0.85rem' }}>Work in progress. Thank you alumni!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NeedCard;
