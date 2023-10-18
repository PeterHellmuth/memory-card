import { useState } from 'react'
import './App.css'
import Card from './Card'

function App() {
  const [bestScore, setBestScore] = useState(0)
  const [pickedCards, setPickedCards] = useState([])
  const [lostGame, setLostGame] = useState(null)
  const [currentCards, setCurrentCards] = useState([])
  const [lastScore, setLastScore] = useState(0)

  if(currentCards.length ===0){
    fetch("https://rickandmortyapi.com/api/character").then(function(response){
      return response.json();
    }).then(function(response){
      let shuffledArr = shuffle(response.results);
      setCurrentCards(shuffledArr.slice(0,10));
    });
  }

  function cardClicked(index){
    if(pickedCards.includes(currentCards[index].name)){ //lose game
      setLostGame(currentCards[index].name);
      setLastScore(pickedCards.length)
    } else{
      let tempList = pickedCards.map((name) => name);
      tempList.push(currentCards[index].name)
      setPickedCards(tempList); //Add the clicked card name to the picked list.
      if(tempList.length > bestScore){
        setBestScore(tempList.length); //Increase high score if we have one.
      }
      setCurrentCards([]) //reset cards
    }
  }

  function restartGame(){
    setPickedCards([]); //wipe out current score
    setCurrentCards([]); //reset cards
    setLostGame(null);
  }

  let lostGameClass = null;
  let cardClickFunction = null;
  if(lostGame){
    lostGameClass="lost-game"
  } else{
    lostGameClass="playing-game"
    cardClickFunction = cardClicked;
  }

  return (
    <>
      <h1>Welcome to the Rick and Morty memory game. Don&apos;t pick the same character twice!</h1>
      <h1>Current score: {pickedCards.length}</h1>
      <h1>Best score: {bestScore}</h1>
      <div className="card-container">
        {currentCards.map((card, index) =>{
            return(
              <Card key={index} index = {index} onClick={cardClickFunction} name={card.name} image={card.image}/>
          )
        })}
      </div>
      <div className={lostGameClass}>
        <h2>I&apos;m terribly sorry, but you&apos;ve already picked {lostGame}. Your score was {lastScore}.</h2>
        <button className="restart-button" onClick={restartGame}>Restart Game</button>
      </div>
    </>
  )
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default App
