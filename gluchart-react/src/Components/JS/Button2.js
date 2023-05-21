import React from 'react';
import '../CSS/Button2.css';

export default function Button2({ text, color }) {
    return (
        <div>
            <button className="tab2" style={{ backgroundColor: color }}>
            <span className="button-text2">{text}</span>
            </button>
      </div>
    )
}