// components/Header.jsx
"use client";
import { useState } from 'react';
import Link from 'next/link';



interface HeaderProps {
  totalDays: number;
  onDayChange: (day: number) => void;
  scrollToSection: (sectionId: string) => void;
}

const Header = ({ totalDays, onDayChange, scrollToSection }: HeaderProps) => {
  const [selectedDay, setSelectedDay] = useState(1);
  
  const handleDayChange = (day: number) => {
    setSelectedDay(day);
    onDayChange(day);
  };

  return (
    <header style={{ 
      backgroundColor: 'white', 
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      padding: '1rem',
      position: 'sticky',
      top: 64,
      zIndex: 50
    }}>
      <div className="max-w-full mx-auto flex flex-row justify-between items-center flex-wrap">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/">
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ 
                width: '2.5rem', 
                height: '2.5rem', 
                backgroundColor: 'var(--color-tertiary)',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                marginRight: '0.5rem'
              }}>
                T
              </div>
              <span style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold',
                color: 'var(--color-secondary)'
              }}>
                TravelBuddy
              </span>
            </div>
          </Link>
          
          <div style={{ marginLeft: '2rem' }}>
          <div
            style={{
              display: 'flex', // Enable horizontal layout
              borderBottom: '1px solid var(--color-secondary)', // Optional: Bottom border for visual separation
            }}
          >
            {Array.from({ length: totalDays }, (_, i) => (
              <span
                key={i + 1}
                onClick={() => handleDayChange(i + 1)}
                style={{
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  color: selectedDay === i + 1 ? 'var(--color-primary)' : 'var(--color-secondary)', // Highlight selected tab
                  backgroundColor: selectedDay === i + 1 ? 'var(--color-secondary)' : 'transparent',
                  border: 'none',
                  outline: 'none',
                  // Add more styling as needed for your tab appearance
                }}
              >
                Day {i + 1}
              </span>
            ))}
          </div>
        </div>
            <div style={{ 
              pointerEvents: 'none', 
              position: 'absolute', 
              inset: '0 0 0 auto',
              display: 'flex',
              alignItems: 'center',
              paddingRight: '0.5rem',
              color: 'var(--color-secondary)'
            }}>
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => scrollToSection('flightOptions')}
            style={{ 
              backgroundColor: 'var(--color-tertiary)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            Flight Options
          </button>
          <button 
            onClick={() => scrollToSection('stayOptions')}
            style={{ 
              backgroundColor: 'var(--color-secondary)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            Stay Options
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;