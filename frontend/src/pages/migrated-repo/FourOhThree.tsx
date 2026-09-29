import React from 'react';

const FourOhThree: React.FC = () => {
  return (
    <div className="modern-container" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f4f4f4',
      padding: '50px 20px',
      fontFamily: "'Arial', sans-serif",
      color: '#333'
    }}>
      <div className="modern-card" style={{
        maxWidth: '600px',
        width: '100%',
        padding: '40px 20px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '3em',
          color: '#e74c3c',
          margin: '0 0 20px 0',
          fontWeight: 'bold'
        }}>
          403 - Forbidden
        </h1>
        <p style={{
          fontSize: '1.5em',
          color: '#555',
          margin: '0 0 30px 0'
        }}>
          Sorry, you do not have permission to access this page.
        </p>
        <a 
          href="/" 
          className="btn btn-primary"
          style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '1.2em',
            backgroundColor: '#3498db',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2980b9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#3498db';
          }}
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default FourOhThree;