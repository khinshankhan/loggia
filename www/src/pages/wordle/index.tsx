import React, { useState } from "react";
import { Center, Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import { IBoard2D, Board2DController } from "src/utils/board";

const Title = () => <Heading id="title">Wordle</Heading>;

interface IBoardProps {
  board: IBoard2D<string>;
  rowName?: string;
  colName?: string;
}

const Board2D = ({ board, rowName = `row`, colName = `col` }: IBoardProps) => (
  <Container id="board">
    <Grid templateColumns="repeat(1, 1fr)" gap={1}>
      {board.rows.map(({ cols, id: rowId }, rowIndex) => (
        <Grid
          id={rowId}
          key={rowId}
          aria-label={`${rowName}-${rowIndex + 1}`}
          templateColumns={`repeat(${cols.length}, 1fr)`}
          gap={1}
        >
          {cols.map(({ item, id: colId }, colIndex) => (
            <GridItem
              id={colId}
              key={colId}
              aria-label={`${colName}-${colIndex + 1}`}
              w="100%"
              bg="papayawhip"
              border="2px"
              borderColor="black"
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

  return (
    <div id="wordle">
      <Title /> <Board2D board={guesses} rowName="word" colName="letter" />
    </div>
  );
};

export default Wordle;
