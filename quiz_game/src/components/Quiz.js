import React from "react";
import {nanoid} from 'nanoid'

export default function Quiz(props) {
    const [questionValues, changeQuestionValues] = React.useState({})
    const [formatedQuestions, getFormattedQuestions] = React.useState(undefined)
    const [submitError, setSubmitError] = React.useState(false)
    const [arrayOfQuestions, setArrayOfQuestions] = React.useState([])
    // const [arrayOfChosenButtons, setArrayOfChosenButtons] = React.useState([])
    const [counter, incCounter] = React.useState(0)


    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
      
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    React.useEffect(() => {
        const stepFormatedQuestions = props.questions.map(el => {
        const line = shuffle([...el.incorrect_answers, el.correct_answer])
        setArrayOfQuestions(prevArray => [
            ...prevArray,
            {ques: el.question, correct_answer: el.correct_answer, answ: [...line], chosenAnswer: ""},
        ])
    })
    }, [])
    

    
    React.useEffect(() => {
        function chooseAnswer(event, arrayOfQuestions, correct_answer, index){
            if (event.target.name === "answer"){
                for (let i = 0; i < arrayOfQuestions.length; i++){
                    if (arrayOfQuestions[i].answ.includes(event.target.textContent)){
                        setArrayOfQuestions(prev => {
                            prev[i] = {...prev[i], chosenAnswer: event.target.textContent}
                            return prev
                        })
                        incCounter(prev => prev += 1)
                    }
                }
                changeQuestionValues(prevQuestionVal => ({
                    ...prevQuestionVal, 
                    [index]: {correct: correct_answer, value: event.target.textContent}}))
            }
        }

        const displayQuestions = arrayOfQuestions.map(el => {
            const buttonsArray = el.answ.map(answer => (<button className={el.chosenAnswer === answer ? "button chosen" : "button"} id={nanoid()} name="answer" onClick={(event) => chooseAnswer(event, arrayOfQuestions, el.correct_answer, arrayOfQuestions.indexOf(el))}>{answer}</button>))
            return (
                    <div className="question-block">
                        <p>{el.ques}</p>
                        <div className="buttons-block">
                            {buttonsArray}
                        </div>
                    </div>
                )})
        getFormattedQuestions(displayQuestions)
    }, [arrayOfQuestions, counter])


    function trySubmitAnswers() {
        for (let i = 0; i < Object.keys(questionValues).length; i++){
            if (Object.keys(questionValues).length !== Object.keys(props.questions).length){
                setSubmitError(true)
                return
            }
        }
        props.submitAnswers(questionValues, arrayOfQuestions)
    }

    console.log(arrayOfQuestions)
    console.log(counter)

    return (
        <div className="quiz">
            {formatedQuestions}
            <button className="button button-submit" onClick={trySubmitAnswers}>Submit answers</button>
            {submitError && <h2>You didn't answer all questions</h2>}
        </div>
    )
}