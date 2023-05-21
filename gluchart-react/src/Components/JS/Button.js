import React from 'react';
import '../CSS/Button.css';

export default function Button({ text, active, backColor, fontColor, onClick }) {
    return (
      <div>
        <button
          className={`tab ${active ? 'active' : ''}`}
          style={active ? { backgroundColor: backColor, color: fontColor } : null}
          onClick={() => onClick(text)}
        >
          {text}
        </button>
      </div>
    );
  }
