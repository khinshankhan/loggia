import React from "react";
import { Center, Container, Grid, GridItem } from "@chakra-ui/react";
import { IBoard2D } from "src/utils";

export interface IBoardProps {
  board: IBoard2D<string>;
  rowName?: string;
  colName?: string;
}

export const Board2D = ({ board, rowName = `row`, colName = `col` }: IBoardProps) => (
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
