import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz-1";
import Difficulty from "./components/Difficulty";
import EndQuiz from "./components/EndQuiz";
import data from "./response"

export default function App() {
  const [begin, toggleBegin] = React.useState(true)
  const [chooseDifficulty, startChoosingDifficulty] = React.useState(false);
  const [quizStarted, startQuiz] = React.useState(false);
  const [quizEnded, handleEndQuiz] = React.useState(false)

  const [questions, setQuestions] = React.useState([])
  const [parsedAnswers, parseAnswers] = React.useState([])

  const [chosenDifficulty, setChosenDifficulty] = React.useState("easy")
  const [counterCorrect, incCorrect] = React.useState(0)
  const [counterIncorrect, incIncorrect] = React.useState(0)


  function handleChooseDifficulty(){
    startChoosingDifficulty(true)
    toggleBegin(false)
  };

  function handleStartQuiz(toChosenDifficulty){
    setChosenDifficulty(toChosenDifficulty)
    startChoosingDifficulty(false)
    startQuiz(true)
  };


  function submitAnswers(submittedAnswers, arrayOfQuestions){
    const displayQuestions = arrayOfQuestions.map(el => {
      const buttonsArray = el.answ.map(answer => {
        let classname = "button"
        if (submittedAnswers[arrayOfQuestions.indexOf(el)].correct === submittedAnswers[arrayOfQuestions.indexOf(el)].value && submittedAnswers[arrayOfQuestions.indexOf(el)].value === answer){
          classname = "button correct"
          incCorrect(prev => prev += 1)
        } else if(submittedAnswers[arrayOfQuestions.indexOf(el)].correct !== submittedAnswers[arrayOfQuestions.indexOf(el)].value && submittedAnswers[arrayOfQuestions.indexOf(el)].value === answer){
          classname = "button incorrect"
        }
        return (<button className={classname} name="answer">{answer}</button>)
      })
      incIncorrect(prev => prev += 1)
      return (
          <div className="question-block">
              <p>{el.ques}</p>
              <div className="buttons-block">
                  {buttonsArray}
              </div>
          </div>
      )})
    parseAnswers(displayQuestions)
    startQuiz(false)
    handleEndQuiz(true)
  }

  function startAgain(){
    handleEndQuiz(false)
    startChoosingDifficulty(true)
    incCorrect(0)
    incIncorrect(0)
  }

  return (
    <div className="App">
      {begin && <Start handleChooseDifficulty={handleChooseDifficulty}/>}
      {chooseDifficulty && <Difficulty handleStartQuiz={handleStartQuiz} />}
      {quizStarted && <Quiz questions={questions} submitAnswers={submitAnswers} setQuestions={setQuestions} chosenDifficulty={chosenDifficulty}/>}
      {quizEnded && <EndQuiz parsedAnswers={parsedAnswers} counterCorrect={counterCorrect} counterIncorrect={counterIncorrect} startAgain={startAgain}/>}
      {/* {chooseDifficulty ? quizStarted ? <Quiz questions={questions} submitAnswers={submitAnswers} classes={classes} /> : <Difficulty handleStartQuiz={handleStartQuiz} /> : <Start handleChooseDifficulty={handleChooseDifficulty}/>} */}
    </div>
  );
}
