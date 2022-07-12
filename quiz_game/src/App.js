import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Difficulty from "./components/Difficulty";
import EndQuiz from "./components/EndQuiz";
import data from "./response"

export default function App() {
  const [begin, toggleBegin] = React.useState(true)
  const [chooseDifficulty, startChoosingDifficulty] = React.useState(false);
  const [quizStarted, startQuiz] = React.useState(false);
  const [quizEnded, handleEndQuiz] = React.useState(false)

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
    startChoosingDifficulty(true)
    toggleBegin(false)
  };

  function handleStartQuiz(chosenDifficulty){
    handleSetQuestions(chosenDifficulty)
    startChoosingDifficulty(false)
    startQuiz(prevVal => !prevVal)
  };

  function submitAnswers(submittedAnswers, arrayOfQuestions){
    const savedSubmittedAnswers = submittedAnswers
    const savedArrayOfQuestions = arrayOfQuestions
    // for (let i = 0; i < Object.keys(submittedAnswers).length; i++){
    //   if (submittedAnswers[Object.keys(submittedAnswers)[i]].correct === submittedAnswers[Object.keys(submittedAnswers)[i]].value){
    //     console.log(1)
    //   } else {
    //     console.log(2)
    //   }
    startQuiz(false)
    handleEndQuiz(true)
    // }
  }
  
  return (
    <div className="App">
      {begin && <Start handleChooseDifficulty={handleChooseDifficulty}/>}
      {chooseDifficulty && <Difficulty handleStartQuiz={handleStartQuiz} />}
      {quizStarted && <Quiz questions={questions} submitAnswers={submitAnswers} classes={classes} />}
      {quizEnded && <EndQuiz submittedAnswers={savedSubmittedAnswers} arrayOfQuestions={savedArrayOfQuestions} />}
      {/* {chooseDifficulty ? quizStarted ? <Quiz questions={questions} submitAnswers={submitAnswers} classes={classes} /> : <Difficulty handleStartQuiz={handleStartQuiz} /> : <Start handleChooseDifficulty={handleChooseDifficulty}/>} */}
    </div>
  );
}
