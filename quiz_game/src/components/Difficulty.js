import React from "react";
import styled from "styled-components"

export default function Difficulty(props) {
  const levels = ["easy", "medium", "hard"];
  const [active, setActive] = React.useState(levels[0]);

  const Button = styled.button`
    background-color: "#3f51b5";
    color: black;
    padding: 5px 15px;
    border-radius: 5px;
    border: none;
    outline: 0;
    text-transform: uppercase;
    margin: 10px 0px;
    cursor: pointer;
    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    &:hover {
        background-color: "#283593";
    }
    `;

  const ButtonToggle = styled(Button)`
  opacity: 0.7;
  ${({ active }) =>
      active &&
      `
      background-color:  #c2c2d6;
  `}
  `;


  function ToggleGroup() {
      return (
        <div className="difficulty-buttons">
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
            <button className="button continue" onClick={() => props.handleStartQuiz(active)}>Continue</button>
        </div>
    )
}