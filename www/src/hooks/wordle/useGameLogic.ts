import { useState, useEffect } from "react";
import { useFirstRender, useKeyDownCapture } from "src/hooks";
import { IBoard2DCol, Board2DController, isAlpha } from "src/utils";

export const useGameLogic = (
  word: string,
  determineColor: (actualWord: string, letter: string, index: number) => string
) => {
  const firstRender = useFirstRender();

  const [gameWord] = useState(word);
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

    [...Array(gameWord.length).keys()].forEach((i) => {
      const letter = guess[i] || ``;

      newBoard.updateRC(rowNum, i, ({ ...cell }: IBoard2DCol<string>) =>
        updateCell(i, letter, cell)
      );
    });

    setBoard2D(newBoard);
  };

  useEffect(() => {
    updateBoard(guessNum, (_i, letter, cell) => ({ ...cell, item: letter }));

    // NOTE: updateBoard will change per rerender,
    // but it's written in a manner such that stale state shouldn't effect it
    // so it's safe and better to ignore it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guess, guessNum]);

  useEffect(() => {
    updateBoard(guessNum - 1, (i, letter, cell) => ({
      ...cell,
      properties: { bgColor: determineColor(gameWord, letter, i) },
    }));

    setGuess(``);
    if (gameWord === guess) setWon(true);

    // NOTE: updateBoard will change per rerender,
    // but it's written in a manner such that stale state shouldn't effect it
    // so it's safe and better to ignore it
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return { board2D, won };
};
