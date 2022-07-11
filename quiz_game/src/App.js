import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Difficulty from "./components/Difficulty";

export default function App() {
  const [chooseDifficulty, startChoosingDifficulty] = React.useState(false);
  const [quizStarted, startQuiz] = React.useState(false);
  const [quizDifficulty, changeQuizDifficulty] = React.useState("easy")
  const [questions, setQuestions] = React.useState([])

  function querryNSetQuestions(chosenDifficulty){
    let response = fetch(`https://opentdb.com/api.php?amount=5&difficulty=${chosenDifficulty}&type=multiple`)
    console.log(response)
  }

  function handleChooseDifficulty(){
    startChoosingDifficulty(prevStart => !prevStart)
  };

  function handleStartQuiz(chosenDifficulty){
    querryNSetQuestions(chosenDifficulty)
    startQuiz(prevVal => !prevVal)
  };

  return (
    <div className="App">
      {chooseDifficulty ? 
      quizStarted ? 
      <Quiz/> : 
      <Difficulty 
        handleStartQuiz={handleStartQuiz}
      /> : 
      <Start 
        handleChooseDifficulty={handleChooseDifficulty}
      />}
    </div>
  );
}
