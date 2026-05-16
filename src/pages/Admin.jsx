import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Camera, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { addNeed } = useAppContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Infrastructure');
  const [costEstimate, setCostEstimate] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a fake URL for the uploaded image (for simulation purposes)
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNeed({
      title,
      description,
      category,
      costEstimate: Number(costEstimate),
      imageUrl: imagePreview || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop' // fallback image
    });
    
    // Redirect to dashboard after adding
    navigate('/');
  };

  return (
    <div className="container">
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PlusCircle color="var(--primary)" />
          Post a New Need
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Headmaster Portal: Describe the requirement, estimate the cost, and upload a photo to show alumni exactly what is needed.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Title (Short and clear)</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. New blackboards for Class 10" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label className="input-label">Category</label>
            <select 
              className="input-field" 
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="Infrastructure">Infrastructure (Roofs, Toilets, Walls)</option>
              <option value="Furniture">Furniture (Desks, Chairs)</option>
              <option value="Supplies">Supplies (Books, Paints, Sports Kits)</option>
              <option value="Technology">Technology (Computers, Projectors)</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Cost Estimate (₹)</label>
            <input 
              type="number" 
              className="input-field" 
              placeholder="e.g. 5000" 
              value={costEstimate}
              onChange={e => setCostEstimate(e.target.value)}
              required 
              min="100"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Detailed Description</label>
            <textarea 
              className="input-field" 
              rows="4" 
              placeholder="Explain why this is needed and how it will help the students..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="input-group">
            <label className="input-label">Upload Impact Photo ("Before" state)</label>
            <div style={{ 
              border: '2px dashed var(--border-color)', 
              borderRadius: 'var(--radius-md)', 
              padding: '2rem', 
              textAlign: 'center',
              backgroundColor: 'var(--bg-color)',
              position: 'relative',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
            className="hover:border-primary"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: 'var(--radius-md)' }} />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)' }}>
                  <Camera size={32} style={{ marginBottom: '1rem' }} />
                  <span>Click to select an image or drag and drop</span>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} 
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '0.8rem' }}>
              Publish Need to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
