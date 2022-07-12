import React from "react";

export default function Quiz(props) {
    const [questionValues, changeQuestionValues] = React.useState({
        0: {correct: null, value: undefined},
        1: {correct: null, value: undefined},
        2: {correct: null, value: undefined},
        3: {correct: null, value: undefined},
        4: {correct: null, value: undefined},
    })
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


    const formatedQuestions = props.questions.map(el => {
            const line = shuffle([...el.incorrect_answers, el.correct_answer])
            setArrayOfQuestions(prevArray => [...prevArray, line])

    React.useEffect(() => {
        function chooseAnswer(event, correct){
            if (event.target.name === "answer"){
                changeQuestionValues(prevQuestionVal => ({
                    ...prevQuestionVal, 
                    [event.target.id]: {correct: correct, value: event.target.textContent}}))
            }
        }


                
                return (
                    <div>
                        <h5>{el.question}</h5>
                        <button id={props.questions.indexOf(el)} name="answer" onClick={(event) => chooseAnswer(event, el.correct_answer)}>{line[0]}</button>
                        <button id={props.questions.indexOf(el)} name="answer" onClick={(event) => chooseAnswer(event, el.correct_answer)}>{line[1]}</button>
                        <button id={props.questions.indexOf(el)} name="answer" onClick={(event) => chooseAnswer(event, el.correct_answer)}>{line[2]}</button>
                        <button id={props.questions.indexOf(el)} name="answer" onClick={(event) => chooseAnswer(event, el.correct_answer)}>{line[3]}</button>
                    </div>
                )
            })
        getFormattedQuestions(formatedQuestions)
    }, [props.questions])


    function trySubmitAnswers() {
        for (let i = 0; i < Object.keys(questionValues).length; i++){
            console.log(questionValues[i])
            if (!questionValues[i].value){
                setSubmitError(true)
                return
            }
        }
        props.submitAnswers(questionValues)
    }
    console.log(arrayOfQuestions)

    return (
        <div className="quiz">
            {formatedQuestions}
            <button onClick={trySubmitAnswers}>Submit</button>
            {submitError && <h2>You didn't answer all questions</h2>}
        </div>
    )
}