import React from 'react';
import '../CSS/Button2.css';

export default function Button2({text},{color}) {
    const buttonStyle = {
        backgroundColor: 'blue'
    };
    return (
        <div>
            <button className="tab">
                {text}
            </button>
        </div>
    )
}