import { useState, useEffect } from "react";
import Card from "./components/Card.tsx";
import Button from "./components/Button.tsx";
import { Shuffle } from "lucide-react";

type IconName =
  | "None"
  | "Plane"
  | "CupSoda"
  | "ChartSpline"
  | "Trees"
  | "Tractor"
  | "Van"
  | "Volleyball"
  | "Rocket"
  | "Drum";

interface CardData {
  id: number;
  emblem: IconName;
  // other fields
}
const cards: CardData[] = [
  { id: 1, emblem: "Plane" },
  { id: 2, emblem: "Plane" },
  { id: 3, emblem: "CupSoda" },
  { id: 4, emblem: "CupSoda" },
  { id: 5, emblem: "Trees" },
  { id: 6, emblem: "Trees" },
  { id: 7, emblem: "Tractor" },
  { id: 8, emblem: "Tractor" },
  { id: 9, emblem: "Van" },
  { id: 10, emblem: "Van" },
  { id: 11, emblem: "Volleyball" },
  { id: 12, emblem: "Volleyball" },
  { id: 13, emblem: "Rocket" },
  { id: 14, emblem: "Rocket" },
  { id: 15, emblem: "Drum" },
  { id: 16, emblem: "Drum" },
];

export default function App() {
  const [totalCard, setTotalCard] = useState(12);
  const [cardList, setCardList] = useState<CardData[]>(cards);
  const [numberCardsSelected, setNumberCardsSelected] = useState(0);
  const [cardOne, setCardOne] = useState("None");
  const [cardTwo, setCardTwo] = useState("None");
  const [flippedCards, setFlippedCards] = useState<number[]>([]); // store indices of flipped cards
  const [matchedCards, setMatchedCards] = useState<number[]>([]); // store indices of flipped cards
  const [cardDisabled, setCardDisabled] = useState(false);

  useEffect(() => {
    if (numberCardsSelected === 2) {
      setCardDisabled(true);
      const timeout = setTimeout(() => {
        if (cardOne === cardTwo && cardOne !== "None") {
          setMatchedCards((prev) => [
            ...prev,
            ...cardList
              .filter((card) => card.emblem === cardOne)
              .map((card) => card.id),
          ]);
        }

        // Reset selection
        setCardOne("None");
        setCardTwo("None");
        setNumberCardsSelected(0);
        setFlippedCards([]); // reset flipped cards
        setCardDisabled(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [numberCardsSelected]);

  useEffect(() => {
    // Shuffle cards when totalCard changes
    shuffleCards();
  }, [totalCard]);

  const shuffleCards = () => {
    const shuffled = cards.slice(0, totalCard);
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCardList(shuffled);
  };

  const handleCardClick = (emblem: IconName, index: number) => {
    setFlippedCards((prev) => [...prev, index]);

    if (numberCardsSelected >= 2) return; // prevent extra clicks

    if (numberCardsSelected === 0) {
      setCardOne(emblem);
      setNumberCardsSelected(1);
    } else if (numberCardsSelected === 1) {
      setCardTwo(emblem);
      setNumberCardsSelected(2);
    }
  };

  const handleResetClick = () => {
    setCardOne("None");
    setCardTwo("None");
    setNumberCardsSelected(0);
    setFlippedCards([]);
    setMatchedCards([]);
    shuffleCards();
  };

  return (
    <div className="p-6 w-full min-h-screen justify-center items-center flex flex-col">
      <p>Select number of cards</p>
      <select
        className="mt-2 bg-gray-700 w-1/4 p-2 rounded"
        id="selectCards"
        disabled={flippedCards.length > 0 || matchedCards.length > 0}
        value={totalCard}
        onChange={(e) => setTotalCard(Number(e.target.value))}
      >
        <option value="4">4</option>
        <option value="6">6</option>
        <option value="8">8</option>
        <option value="10">10</option>
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
      </select>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {cardList.slice(0, totalCard).map((card, index) => (
          <Card
            key={index}
            setOnClick={() => handleCardClick(card.emblem, card.id)}
            emblem={card.emblem}
            disabled={cardDisabled}
            isFlipped={flippedCards.includes(card.id)}
            isGuessed={matchedCards.includes(card.id)}
          />
        ))}
      </div>
      <div className="mt-6">
        <p>Card One: {cardOne}</p>
        <p>Card Two: {cardTwo}</p>
      </div>
      <Button onClick={handleResetClick}>Reset</Button>
    </div>
  );
}
