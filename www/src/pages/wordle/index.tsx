import React from "react";
import { Heading } from "@chakra-ui/react";
import { Board2D } from "src/components/wordle";
import { useGameLogic } from "src/hooks/wordle";

const Title = () => <Heading id="title">Wordle</Heading>;

const determineColor = (word: string, letter: string, index: number) => {
  if (word[index] === letter) return `green.500`;
  if ([...word].some((wordLetter) => wordLetter === letter)) return `yellow.200`;
  return `red.500`;
};

const Wordle = () => {
  const word = `CRANE`;

  const { board2D, won } = useGameLogic(word, determineColor);
  console.log({ won });
  const { board: guesses } = board2D;

  return (
    <div id="wordle">
      <Title /> <Board2D board={guesses} rowName="word" colName="letter" />
    </div>
  );
};

export default Wordle;
