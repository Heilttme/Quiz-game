import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Difficulty from "./components/Difficulty";
import data from "./response"

export default function App() {
  const [chooseDifficulty, startChoosingDifficulty] = React.useState(false);
  const [quizStarted, startQuiz] = React.useState(false);
  const [questions, setQuestions] = React.useState([])
  const [result, setResult] = React.useState({})
  const [classes, setClasses] = React.useState({
    0: "button-answer",
    1: "button-answer",
    2: "button-answer",
    3: "button-answer",
    4: "button-answer",
  })

  function handleSetQuestions(chosenDifficulty){
    setResult(data.results)
    // let result = fetch(`https://opentdb.com/api.php?amount=5&difficulty=${chosenDifficulty}&type=multiple`)
    //   .then(data => data.json())
    setQuestions(data.results)
  }

  function handleChooseDifficulty(){
    startChoosingDifficulty(prevStart => !prevStart)
  };

  function handleStartQuiz(chosenDifficulty){
    handleSetQuestions(chosenDifficulty)
    startQuiz(prevVal => !prevVal)
  };

  function submitAnswers(submittedAnswers){
    for (let i = 0; i < Object.keys(submittedAnswers).length; i++){
      if (submittedAnswers[i] === result[i].correct_answer){
        setClasses(prevClasses => ({
          ...prevClasses,
          [parseInt(i, 10)]: "button-answer correct"
        }))
      } else {
        setClasses(prevClasses => ({
          ...prevClasses,
          [parseInt(i, 10)]: "button-answer incorrect"
        }))
      }
    }
  }
  
  return (
    <div className="App">
      {chooseDifficulty ? 
      quizStarted ? 
      <Quiz 
        questions={questions}
        submitAnswers={submitAnswers}
        classes={classes}
      /> : 
      <Difficulty 
        handleStartQuiz={handleStartQuiz}
      /> : 
      <Start 
        handleChooseDifficulty={handleChooseDifficulty}
      />}
    </div>
  );
}
