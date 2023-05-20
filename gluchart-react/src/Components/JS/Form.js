import React from 'react';
import '../CSS/Form.css'
import Button from './Button'

export default function Home() {
    return (
        <div className="form">
            <div className="top-buttons">
                <Button text="Glucose"/>
                <Button text="Meal" />
                <Button text="Insulin" />
            </div>

            <hr className="divider"></hr>

            <label for="fname" className="grams">insert grams</label>
            <input type="text" id="fname" name="firstname" placeholder="Your name.."></input>
        </div>
    );
}