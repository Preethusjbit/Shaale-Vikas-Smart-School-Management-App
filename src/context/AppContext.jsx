import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const initialNeeds = [
  {
    id: '1',
    title: 'Leaking Roof Repair',
    description: 'The main hall roof leaks during monsoon. Need immediate repair to prevent water damage to books.',
    category: 'Infrastructure',
    costEstimate: 15000,
    amountPledged: 9000,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1595846519845-68e298c2cebc?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: '2',
    title: '5 Sets of Paints for Wall',
    description: 'The kindergarten classroom walls are peeling. We need paint to make it vibrant again.',
    category: 'Supplies',
    costEstimate: 2500,
    amountPledged: 2500,
    status: 'fulfilled',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Broken Desks Replacement',
    description: '10 desks in the 8th-grade classroom are completely broken. Students are sitting on the floor.',
    category: 'Furniture',
    costEstimate: 8000,
    amountPledged: 2000,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop'
  }
];

const initialDonors = [
  { id: 'd1', name: 'Rahul Sharma', amount: 5000, needId: '1', timestamp: new Date(Date.now() - 86400000).toISOString() },
  { id: 'd2', name: 'Priya Patel', amount: 2500, needId: '2', timestamp: new Date(Date.now() - 172800000).toISOString() },
  { id: 'd3', name: 'Anonymous Alumni', amount: 4000, needId: '1', timestamp: new Date(Date.now() - 43200000).toISOString() },
  { id: 'd4', name: 'Vikram Singh', amount: 2000, needId: '3', timestamp: new Date(Date.now() - 10000000).toISOString() }
];

export const AppProvider = ({ children }) => {
  const [needs, setNeeds] = useState(() => {
    const saved = localStorage.getItem('shaale_needs');
    return saved ? JSON.parse(saved) : initialNeeds;
  });

  const [donors, setDonors] = useState(() => {
    const saved = localStorage.getItem('shaale_donors');
    return saved ? JSON.parse(saved) : initialDonors;
  });

  useEffect(() => {
    localStorage.setItem('shaale_needs', JSON.stringify(needs));
  }, [needs]);

  useEffect(() => {
    localStorage.setItem('shaale_donors', JSON.stringify(donors));
  }, [donors]);

  const addNeed = (needData) => {
    const newNeed = {
      ...needData,
      id: Date.now().toString(),
      amountPledged: 0,
      status: 'open',
    };
    setNeeds([newNeed, ...needs]);
  };

  const pledgeSupport = (needId, donorName, amount) => {
    // Add donor
    const newDonor = {
      id: Date.now().toString(),
      name: donorName || 'Anonymous Alumni',
      amount: Number(amount),
      needId,
      timestamp: new Date().toISOString()
    };
    setDonors([newDonor, ...donors]);

    // Update need
    setNeeds(needs.map(need => {
      if (need.id === needId) {
        const newAmount = need.amountPledged + Number(amount);
        return {
          ...need,
          amountPledged: newAmount,
          status: newAmount >= need.costEstimate ? 'fulfilled' : 'open'
        };
      }
      return need;
    }));
  };

  return (
    <AppContext.Provider value={{ needs, donors, addNeed, pledgeSupport }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
