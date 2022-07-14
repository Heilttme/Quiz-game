import React from "react";
import styled from "styled-components"

export default function Difficulty0(props) {
    const [chosenDifficulty, chooseDifficulty] = React.useState("easy")


    function handleChooseDifficulty(event) {
        chooseDifficulty(event.target.value)
    } 

    const Button = styled.button`
    background-color: "#3f51b5";
    color: black;
    padding: 5px 15px;
    border-radius: 5px;
    outline: 0;
    text-transform: uppercase;
    margin: 10px 0px;
    cursor: pointer;
    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    &:hover {
        background-color: "#283593";
    }
    &:disabled {
        cursor: default;
        opacity: 0.7;
    }
    `;

    const ButtonToggle = styled(Button)`
    opacity: 0.7;
    ${({ active }) =>
        active &&
        `
        opacity: 1; 
    `}
    `;

    const Tab = styled.button`
    padding: 10px 30px;
    cursor: pointer;
    opacity: 0.6;
    background: white;
    border: 0;
    outline: 0;
    border-bottom: 2px solid transparent;
    transition: ease border-bottom 250ms;
    ${({ active }) =>
        active &&
        `
        border-bottom: 2px solid black;
        opacity: 1;
    `}
    `;

    const levels = ["Easy", "Medium", "Hard"];

    function ToggleGroup() {
        const [active, setActive] = React.useState(levels[0]);
        return (
          <div>
            {levels.map((level) => (
              <ButtonToggle active={active === level} onClick={() => setActive(level)}>
                {level}
              </ButtonToggle>
            ))}
          </div>
        );
      }
      


    return (
        <div className="choose-difficulty">
            <h1>Select difficulty</h1>
            <ToggleGroup />
            {/* <div className="difficulty-buttons">
                <button className="button" value="easy" onClick={handleChooseDifficulty}>Easy</button>
                <button className="button" value="medium" onClick={handleChooseDifficulty}>Medium</button>
                <button className="button" value="hard" onClick={handleChooseDifficulty}>Hard</button>
            </div> */}
            <button className="button continue" onClick={() => props.handleStartQuiz(chosenDifficulty)}>Continue</button>
        </div>
    )
}