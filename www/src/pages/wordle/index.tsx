import React, { useState, useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import { Board2D } from "src/components/wordle";
import { useFirstRender, useKeyDownCapture } from "src/hooks";
import { IBoard2DCol, Board2DController, isAlpha } from "src/utils";

const Title = () => <Heading id="title">Wordle</Heading>;

const determineColor = (word: string, letter: string, index: number) => {
  if (word[index] === letter) return `green.500`;
  if ([...word].some((wordLetter) => wordLetter === letter)) return `yellow.200`;
  return `red.500`;
};

const useGameLogic = (word: string) => {
  const firstRender = useFirstRender();

  const [board2D, setBoard2D] = useState(new Board2DController(``, [6, 5], true));
  const [guessNum, setGuessNum] = useState(0);
  const [guess, setGuess] = useState(``);

  const [won, setWon] = useState(false);

  const updateBoard = (
    rowNum: number,
    updateCell: (index: number, letter: string, cell: IBoard2DCol<string>) => IBoard2DCol<string>
  ) => {
    if (won || guessNum > 6 || firstRender) return;

    const newBoard = new Board2DController(``, [6, 5], false);
    newBoard.copy(board2D);

    [...Array(word.length).keys()].forEach((i) => {
      const letter = guess[i] || ``;

      newBoard.updateRC(rowNum, i, ({ ...cell }: IBoard2DCol<string>) =>
        updateCell(i, letter, cell)
      );
    });

    setBoard2D(newBoard);
  };

  useEffect(() => {
    updateBoard(guessNum, (_i, letter, cell) => ({ ...cell, item: letter }));
  }, [guess]);

  useEffect(() => {
    updateBoard(guessNum - 1, (i, letter, cell) => ({
      ...cell,
      properties: { bgColor: determineColor(word, letter, i) },
    }));

    setGuess(``);
    if (word === guess) setWon(true);
  }, [guessNum]);

  useKeyDownCapture((e) => {
    const { key } = e;

    if (key.length === 1 && isAlpha(key)) {
      setGuess((prev) => (prev.length !== 5 ? prev + key.toUpperCase() : prev));
    } else if (key === `Enter`) {
      setGuessNum((prev) => (prev !== 6 ? prev + 1 : prev));
    } else if (key === `Backspace`) {
      setGuess((prev) => (prev.length !== 0 ? prev.slice(0, -1) : prev));
    }
  });

  return board2D;
};

const Wordle = () => {
  const word = `CRANE`;

  const board2D = useGameLogic(word);
  const { board: guesses } = board2D;

  return (
    <div id="wordle">
      <Title /> <Board2D board={guesses} rowName="word" colName="letter" />
    </div>
  );
};

export default Wordle;
