import React from "react";

export default function Start(props) {
    return (
        <div 
            className="start-screen"
        >
            <h1 className="title">Guess it!</h1>
            <p className="additional">Check your knowledge by answering different questions.</p>
            <button 
                className="start-button"
                onClick={props.handleChooseDifficulty}    
            >Start quiz</button>
        </div>
    )
}