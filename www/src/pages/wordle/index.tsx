import React, { useState, useEffect } from "react";
import { Center, Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import { IBoard2D, IBoard2DCol, Board2DController } from "src/utils/board";
import { isAlpha } from "src/utils/validate";

const Title = () => <Heading id="title">Wordle</Heading>;

interface IBoardProps {
  board: IBoard2D<string>;
  rowName?: string;
  colName?: string;
}

const Board2D = ({ board, rowName = `row`, colName = `col` }: IBoardProps) => (
  <Container id="board">
    <Grid templateColumns="repeat(1, 1fr)" gap={1}>
      {board.rows.map(({ cols: row, properties: rowProperties, id: rowId }, rowIndex) => (
        <Grid
          id={rowId}
          key={rowId}
          aria-label={`${rowName}-${rowIndex + 1}`}
          templateColumns={`repeat(${row.length}, 1fr)`}
          gap={1}
          {...rowProperties}
        >
          {row.map(({ item, properties: colProperties, id: colId }, colIndex) => (
            <GridItem
              id={colId}
              key={colId}
              aria-label={`${colName}-${colIndex + 1}`}
              w="100%"
              bg="papayawhip"
              border="2px"
              borderColor="black"
              {...colProperties}
            >
              <Center h="20">{item}</Center>
            </GridItem>
          ))}
        </Grid>
      ))}
    </Grid>
  </Container>
);

const Wordle = () => {
  const word = `crane`;

  const [board2D, setBoard2D] = useState(new Board2DController(``, [6, 5], true));
  const { board: guesses } = board2D;

  const [guessNum, setGuessNum] = useState(0);
  const [guess, setGuess] = useState(``);

  const determineColor = (letter: string, index: number) => {
    if (word[index] === letter) return `green.500`;
    if ([...word].some((wordLetter) => wordLetter === letter)) return `yellow.200`;
    return `red.500`;
  };

  useEffect(() => {
    if (guessNum >= 6) return;
    const newBoard = new Board2DController(``, [6, 5], false);
    newBoard.copy(board2D);

    [...guess].forEach((letter, i) => {
      newBoard.updateRC(guessNum, i, ({ ...cell }: IBoard2DCol<string>) => ({
        ...cell,
        item: letter.toUpperCase(),
      }));
    });

    setBoard2D(newBoard);
  }, [guess]);

  useEffect(() => {
    if (guessNum > 6) return;
    const newBoard = new Board2DController(``, [6, 5], false);
    newBoard.copy(board2D);

    [...guess].forEach((letter, i) => {
      newBoard.updateRC(guessNum - 1, i, ({ ...cell }: IBoard2DCol<string>) => ({
        ...cell,
        properties: { bgColor: determineColor(letter, i) },
      }));
    });

    setBoard2D(newBoard);
    setGuess(``);
  }, [guessNum]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;

      console.log({ key });
      if (key.length === 1 && isAlpha(key)) {
        setGuess((prev) => (prev.length !== 5 ? prev + key : prev));
      } else if (key === `Enter`) {
        setGuessNum((prev) => (prev !== 6 ? prev + 1 : prev));
      }
    };

    document.addEventListener(`keydown`, handleKeyDown);

    return () => {
      document.removeEventListener(`keydown`, handleKeyDown);
    };
  }, []);

  return (
    <div id="wordle">
      <Title /> <Board2D board={guesses} rowName="word" colName="letter" />
    </div>
  );
};

export default Wordle;
