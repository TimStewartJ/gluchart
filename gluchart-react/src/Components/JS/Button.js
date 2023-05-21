import React from 'react';
import '../CSS/Button.css';

export default function Button({text}) {
    return (
        <div>
            <button className="tab">
                <span className="button-text">{text}</span>
            </button>
        </div>
    )
}