import React, { useState, useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import { Board2D } from "src/components/wordle";
import { useFirstRender } from "src/hooks";
import { IBoard2DCol, Board2DController, isAlpha } from "src/utils";

const Title = () => <Heading id="title">Wordle</Heading>;

const useKeyDownCapture = (listener: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    document.addEventListener(`keydown`, listener);

    return () => {
      document.removeEventListener(`keydown`, listener);
    };
  }, []);
};

const Wordle = () => {
  const word = `crane`;

  const firstRender = useFirstRender();

  const [board2D, setBoard2D] = useState(new Board2DController(``, [6, 5], true));
  const { board: guesses } = board2D;

  const [guessNum, setGuessNum] = useState(0);
  const [guess, setGuess] = useState(``);

  const [won, setWon] = useState(false);

  const determineColor = (letter: string, index: number) => {
    if (word[index] === letter) return `green.500`;
    if ([...word].some((wordLetter) => wordLetter === letter)) return `yellow.200`;
    return `red.500`;
  };

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
    updateBoard(guessNum, (_i, letter, cell) => ({ ...cell, item: letter.toUpperCase() }));
  }, [guess]);

  useEffect(() => {
    updateBoard(guessNum - 1, (i, letter, cell) => ({
      ...cell,
      properties: { bgColor: determineColor(letter, i) },
    }));

    setGuess(``);
    if (word === guess) setWon(true);
  }, [guessNum]);

  const handleKeyDown = (e: KeyboardEvent) => {
    const { key } = e;

    if (key.length === 1 && isAlpha(key)) {
      setGuess((prev) => (prev.length !== 5 ? prev + key : prev));
    } else if (key === `Enter`) {
      setGuessNum((prev) => (prev !== 6 ? prev + 1 : prev));
    } else if (key === `Backspace`) {
      setGuess((prev) => (prev.length !== 0 ? prev.slice(0, -1) : prev));
    }
  };

  useKeyDownCapture(handleKeyDown);

  return (
    <div id="wordle">
      <Title /> <Board2D board={guesses} rowName="word" colName="letter" />
    </div>
  );
};

export default Wordle;
