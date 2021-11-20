import './App.css'
import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard'

const cardImages = [
  {'src': '/img/Bride.jpg', matched: false},
  {'src': '/img/Frankenstein.jpg', matched: false},
  {'src': '/img/Dracula.jpg', matched: false},
  {'src': '/img/Mummy.jpg', matched: false},
  {'src': '/img/Creature.jpg', Matched: false},
  {'src': '/img/Wolfman.jpg', matched: false}
]

function App() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
// Shuffle cards

const shuffleCards = () => {
  const shuffledCards = [...cardImages,...cardImages]
  .sort(() => Math.random() - 0.5)
  .map((card) => ({...card, id: Math.random() }))
  setChoiceOne(null)
  setChoiceTwo(null)
  setCards(shuffledCards)
  setTurns(0)
}
//handleChoice
const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

useEffect(() => {
  if(choiceOne && choiceTwo){
    setDisabled(true)
    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      resetTurns()
    } else {
      
      setTimeout(() => resetTurns(), 1000)
    }
  }
}, [choiceOne, choiceTwo ])


const resetTurns = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
}

useEffect(() => {
  shuffleCards()
}, [])

  return (
    <div className="App">
      <h1>Monster Match</h1>
      <button onClick = {shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
            <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            />
        ))}
      </div>
      <h4>Turns:{turns}</h4>
    </div>
  );
}

export default App