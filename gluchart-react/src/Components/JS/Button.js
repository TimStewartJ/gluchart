import React from 'react';
import '../CSS/Button.css';

export default function Button({text}) {
    return (
        <div>
            <button className="tab">
                {text}
            </button>
        </div>
    )
}