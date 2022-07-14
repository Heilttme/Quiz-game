import React from "react";


export default function EndQuiz(props) {
    return (
        <div className="quiz">
            {props.parsedAnswers}
            <h3 className="score">You scored {props.counterCorrect}/{props.counterIncorrect}</h3>
            <button className="button try" onClick={props.startAgain}>Try again</button>
        </div>
    )
}