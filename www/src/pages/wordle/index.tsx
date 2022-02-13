import React, { useState, useEffect } from "react";
import { Center, Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import { IBoard2D, Board2DController } from "src/utils/board";
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
  const [board2D] = useState(new Board2DController(``, [6, 5], true));
  const { board: guesses } = board2D;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;

      if (key.length === 1 && isAlpha(key)) {
        console.log({ key });
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
