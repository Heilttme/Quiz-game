import React from "react";

export default function Quiz(props) {
    
    return (
        <div className="quiz">
            <div className="question-block">
                <h1 className="question-text"></h1>
                <div className="answers-block">
                    <button className="answer-button"></button>
                    <button className="answer-button"></button>
                    <button className="answer-button"></button>
                    <button className="answer-button"></button>
                </div>
            </div>
        </div>
    )
}