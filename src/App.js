import logo from './logo.svg';
import './App.css';
import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const [num1, setNum1] = useState(random(1, 13));
  const [num2, setNum2] = useState(random(1, 13));
  const [num3, setNum3] = useState(random(1, 13));
  const [score, setScore] = useState(0);
  const [iteration, setIteration] = useState(1);
  const [result, setResult] = useState("");
  var btn1 = document.getElementById("btn1");
  var btn2 = document.getElementById("btn2");

  const getIteration = () => {
    return iteration;
  };

  const getScore = () => {
    return score;
  };

  const getNum3 = () => {
    return num3;
  };

  const generate = () => {
    setNum1(random(1, 13));
    setNum2(random(1, 13));
    setNum3(random(1, 13));

    if (iteration == 5) {
      btn1.disabled = true;
      btn2.disabled = true;
    }
  };

  const resultUpdateWin = () => {
    setResult(`Win! The third number is ${getNum3()}`);
  };

  const resultUpdateLose = () => {
    setResult(`Lose! The third number is ${getNum3()}`);
  };

  const resultUpdateNoDeal = () => {
    setResult(`No Deal! The third number is ${getNum3()}`);
  };

  const resultUpdateSame = () => {
    setResult(`Unlucky! All of the numbers are ${getNum3()}`);
  };

  const LabelCheck = (label) => {
    if (num1 == num2) {
      return label == 0 ? "Higher" : "Lower";
    } else {
      return label == 0 ? "Deal" : "No Deal";
    }
  };

  const InBet = (bet) => {
    if (!(num1 == num2 && num2 == num3)) {
      if (getIteration() <= 5) {
        const high = num1 > num2 ? num1 : num2;
        const low = num1 < num2 ? num1 : num2;
        if (bet == "Deal") {
          if (num3 > low && num3 < high) {
            setScore(getScore() + 1);
            resultUpdateWin();
          } else {
            setScore(getScore() - 1);
            resultUpdateLose();
          }
        } else if (bet == "No Deal") {
          setScore(getScore() - 0.5);
          resultUpdateNoDeal();
        } else if (bet == "Higher") {
          if (num3 > high) {
            setScore(getScore() + 1);
            resultUpdateWin();
          } else {
            setScore(getScore() - 1);
            resultUpdateLose();
          }
        } else if (bet == "Lower") {
          if (num3 < high) {
            setScore(getScore() + 1);
            resultUpdateWin();
          } else {
            setScore(getScore() - 1);
            resultUpdateLose();
          }
        }
      } else {
        setScore(getScore() - 1);
        resultUpdateSame();
      }

      generate();
      setIteration(getIteration() + 1);
    }
  };

  const reset = () => {
    generate();
    setScore(0);
    setIteration(1);
    btn1.disabled = false;
    btn2.disabled = false;
    setResult("");
  };

  return (
    <div className="App">
      <h1>In Between Game</h1>
      <h2>  {iteration <= 5 ? "Game " + iteration  + "/5" : "Game Over!"}</h2>
      <h2>Score: <span style={{color:'red'}}>{score}</span></h2>

      <div class="container">
        <div class="row">
            <div class="col-lg-6 mb-4">
                <div class="card">
  
                    <div class="card-body">
                        <h5 class="card-title">Card 1</h5>
                        <p class="card-text" id='card1'>
                          {iteration <= 5 ? num1 : "-"}
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 mb-4">
                <div class="card">  
                    <div class="card-body">
                        <h5 class="card-title">Card 2</h5>
                        <p class="card-text" id='card2'>
                          {iteration <= 5 ? num2 : "-"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

      <h2 hidden>Num 3: {num3}</h2>
      <h2>{result}</h2>
      <input
        type="button"
        class="btn-change"
        value={iteration <= 5 ? LabelCheck(0) : "-"}
        id="btn1"
        onClick={(evt) => {
          InBet(evt.target.value);
        }}
      />

      <input
        type="button"
        class="btn-change1"
        id="btn2"
        value={iteration <= 5 ? LabelCheck(1) : "-"}
        onClick={(evt) => {
          InBet(evt.target.value);
        }}
      />
      <br />
      <br />
      <input
        type="button"
        class="btn-change2"
        value="Reset"
        onClick={() => {
          reset();
        }}
      />
    </div>
  );
}


