import React from "react";
import {nanoid} from 'nanoid'

export default function Quiz(props) {
    const [questionValues, changeQuestionValues] = React.useState({})
    const [formatedQuestions, getFormattedQuestions] = React.useState(undefined)
    const [submitError, setSubmitError] = React.useState(false)
    const [arrayOfQuestions, setArrayOfQuestions] = React.useState([])


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
            {ques: el.question, correct_answer: el.correct_answer, answ: [...line]},
        ])
    })
    }, [])
    

    function chooseAnswer(event, correct_answer, index){
        if (event.target.name === "answer"){
            changeQuestionValues(prevQuestionVal => ({
                ...prevQuestionVal, 
                [index]: {correct: correct_answer, value: event.target.textContent}}))
        }
    }

    React.useEffect(() => {
        const displayQuestions = arrayOfQuestions.map(el => {
            const buttonsArray = el.answ.map(answer => (<button className="button" id={nanoid()} name="answer" onClick={(event) => chooseAnswer(event, el.correct_answer, arrayOfQuestions.indexOf(el))}>{answer}</button>))
                return (
                    <div className="question-block">
                        <p>{el.ques}</p>
                        <div className="buttons-block">
                            {buttonsArray}
                        </div>
                    </div>
                )})
        getFormattedQuestions(displayQuestions)
        return
    }, [arrayOfQuestions])


    function trySubmitAnswers() {
        for (let i = 0; i < Object.keys(questionValues).length; i++){
            if (Object.keys(questionValues).length !== Object.keys(props.questions).length){
                setSubmitError(true)
                return
            }
        }
        props.submitAnswers(questionValues, arrayOfQuestions)
    }
    return (
        <div className="quiz">
            {formatedQuestions}
            <button className="button submit" onClick={trySubmitAnswers}>Submit</button>
            {submitError && <h2>You didn't answer all questions</h2>}
        </div>
    )
}