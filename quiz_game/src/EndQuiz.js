import React from "react";


export default function EndQuiz(props) {
    return (
        <div>
            {props.parsedAnswers}
            <h3>You scored {props.counterCorrect}/{props.counterIncorrect}</h3>
            <button onClick={props.startAgain}>Try again</button>
        </div>
    )
}