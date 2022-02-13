import React, { useState } from "react";
import { Center, Container, Grid, GridItem, Heading } from "@chakra-ui/react";

const Title = () => <Heading id="title">Wordle</Heading>;

const generateBoard2D = (r: number, c: number, k: string = ``) => {
  const board = [];
  for (let i = 0; i < r; i++) {
    const row = [];
    for (let j = 0; j < c; j++) {
      row.push(k);
    }
    board.push(row);
  }

  return board;
};

interface IBoardProps {
  board: string[][];
  rowName?: string;
  colName?: string;
}

const Board2D = ({ board, rowName = `row`, colName = `col` }: IBoardProps) => (
  <Container id="board">
    <Grid templateColumns="repeat(1, 1fr)" gap={1}>
      {board.map((row, rowIndex) => (
        <Grid
          id={`${rowName}-${rowIndex}`}
          // eslint-disable-next-line react/no-array-index-key
          key={`${rowName}-${rowIndex}`}
          templateColumns={`repeat(${row.length}, 1fr)`}
          gap={1}
        >
          {row.map((col, colIndex) => (
            <GridItem
              id={`${colName}-${colIndex}`}
              // eslint-disable-next-line react/no-array-index-key
              key={`${colName}-${colIndex}`}
              w="100%"
              bg="papayawhip"
              border="2px"
              borderColor="black"
            >
              <Center h="20">{col}</Center>
            </GridItem>
          ))}
        </Grid>
      ))}
    </Grid>
  </Container>
);

const Wordle = () => {
  const [guesses] = useState(generateBoard2D(6, 5));

  return (
    <div id="wordle">
      <Title /> <Board2D board={guesses} />
    </div>
  );
};

export default Wordle;
