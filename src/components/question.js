import React from "react"
import './question.css'



export default function Question({ question, options, answerHandler, isAnsShown }) {
	return (
		<div>
			<span className="question">{question}</span>
			<div className="options" style={{
				display: ((isAnsShown === true) ? "none" : "flex")
			}}>
				
			{
				(options).map(function (option, index) {
					return <button onClick={answerHandler}> {option} </button>;
				})
			}
			</div>
		</div>
	)
}		