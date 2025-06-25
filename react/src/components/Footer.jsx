import React from 'react';

const Footer = (prop) => {
    if  (import.meta.env.VITE_ENVIRONMENT != 'development') {
        return (
            <footer className="text-muted" style={{ backgroundColor: 'green', textAlign: 'center' }}>
            <div><strong>{import.meta.env.VITE_ENVIRONMENT}</strong></div>
        </footer>
        );
    }
    return (
        <footer className="text-muted" style={{ backgroundColor: 'yellow', textAlign: 'center' }}>
            <div><strong>{import.meta.env.VITE_ENVIRONMENT}</strong></div>
        </footer>
    );
};
export default Footer;