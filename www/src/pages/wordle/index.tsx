import React from "react";
import { Container, Grid, GridItem, Heading } from "@chakra-ui/react";

const Title = () => <Heading>Wordle</Heading>;

const Board = () => (
  <Container id="board">
    <Grid templateColumns="repeat(1, 1fr)" gap={1}>
      {[1, 2, 3, 4, 5, 6].map((guess) => (
        <Grid id={`guess-${guess}`} key={`guess-${guess}`} templateColumns="repeat(6, 1fr)" gap={1}>
          {[1, 2, 3, 4, 5, 6].map((letter) => (
            <GridItem
              id={`guess-${guess}-letter-${letter}`}
              key={`guess-${guess}-letter-${letter}`}
              w="100%"
              h="20"
              bg="papayawhip"
            />
          ))}
        </Grid>
      ))}
    </Grid>
  </Container>
);

const Wordle = () => (
  <>
    <Title /> <Board />
  </>
);

export default Wordle;
