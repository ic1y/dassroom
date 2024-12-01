import { useState } from 'react';
import './App.css';
import Question from './components/question';
import qList from './components/question.json'
const q = qList.questions;

function App() {
  let [isAnsShown, setIsAnsShown] = useState(false);
  let [isResultsShown, setIsResultsShown] = useState(false);
  let [i, setQnI] = useState(0);
  let [feedback, setFeedback] = useState("");
  let [score, setScore] = useState(0);
  let answerHandler = function (e) {
    if (q[i].answers.includes(e.target.innerText)) {
      setFeedback(e.target.innerText + " is CORRECT");
      setScore(score + 1);
    } else {
      setFeedback(e.target.innerText + " is WRONG. The answer is " + q[i].answers.join(", "))
    }
    setIsAnsShown(true);
  }
  function shuffleArray(array) {
		for (let i = array.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
    }
    return array;
	}
  return (
    <div className="App">
      <main>
        <div style={{
          display: (isResultsShown ? "none" : "flex")
        }}>
          <h1>Pop Quiz 😊</h1>
          <span className="questionNo">Question {i + 1} of {q.length}</span>
          <Question question={q[i].question} options={shuffleArray(q[i].options)} answerHandler={answerHandler} isAnsShown={isAnsShown}></Question>
          <div style={{
            display: (isAnsShown ? "flex" : "none")
          }} className="comments">
            <span className="feedback">{ feedback }</span>
            <span className="explanation">
            {
              isAnsShown ? (<span>{ q[i].explanation }</span>) : ("")
            }
            </span>
            <button className="continue" onClick={function (e) {
              setIsAnsShown(false);
              if ((i + 1) < q.length) {
                setQnI(i + 1);
              } else {
                setIsResultsShown(true);
              }
            }}>{(i + 1) < q.length ? "Next Question" : "View Your Results"}</button>
          </div>
        </div>
        <div style={{
          display: (isResultsShown ? "flex" : "none"),
          rowGap: ("1rem")
        }}>
          <h1>Pop Quiz Results</h1>
          <h2>You got {score} out of {q.length} questions correct! Well done!</h2>
          <img src="/goodjob.png" alt="Good job!"></img>
          <button className="continue" onClick={function () {
            if (typeof navigator.canShare !== "undefined") {
                try {
                  navigator.share({
                    text: `In Pop quiz, I got ${score} out of ${q.length} questions correct! Take this quiz too!`,
                    title: "Cool pop quiz",
                    url: location.href
                  });
              } catch {
                  alert("Failed to share :(");
              }
            } else {
              alert("Your browser doesn't support sharing. You can share it manually :)");
            }
          }}>Share your good results</button>
        </div>
      </main>
    </div>
  );
}

export default App;
