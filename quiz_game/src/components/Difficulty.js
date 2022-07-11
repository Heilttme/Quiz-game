import React from "react";

export default function Difficulty0(props) {
    const [chosenDifficulty, chooseDifficulty] = React.useState("Easy")


    function handleChooseDifficulty(event) {
        chooseDifficulty(event.target.value)
    } 


    return (
        <div className="choose-difficulty">
            <h1>Select difficulty</h1>
            <div className="difficulty-buttons">
                <button value="easy" onClick={handleChooseDifficulty}>Easy</button>
                <button value="medium" onClick={handleChooseDifficulty}>Medium</button>
                <button value="hard" onClick={handleChooseDifficulty}>Hard</button>
            </div>
            <button onClick={() => props.handleStartQuiz(chosenDifficulty)}>Continue</button>
        </div>
    )
}