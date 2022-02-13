import { v4 as uuidv4 } from "uuid";

export interface IBoard2DCol<ItemType> {
  id: string;
  context: { [key: string]: any };
  properties: { [key: string]: any };
  item: ItemType;
}

export interface IBoard2DRow<ItemType> {
  id: string;
  context: { [key: string]: any };
  properties: { [key: string]: any };
  cols: IBoard2DCol<ItemType>[];
}

export interface IBoard2D<ItemType> {
  id: string;
  rows: IBoard2DRow<ItemType>[];
}

export class Board2DController<ItemType> {
  public board = {} as IBoard2D<ItemType>;

  private initial: ItemType;

  private dimensions: number[] = [];

  constructor(initial: ItemType, dimensions: number[], initialize = true) {
    this.initial = initial;
    this.dimensions = dimensions;

    if (initialize) this.initialize(initial, dimensions);
  }

  initialize(initial?: ItemType, dimensions?: number[]) {
    if (initial) {
      this.initial = initial;
    }
    if (dimensions) {
      this.dimensions = dimensions;
    }
    this.board = { id: uuidv4(), rows: [] } as IBoard2D<ItemType>;

    const [r, c] = this.dimensions;
    for (let i = 0; i < r; i++) {
      this.board.rows.push(this.newRow(c));
    }
  }

  newRow(colCount?: number, item?: ItemType) {
    const c = colCount ?? this.dimensions;
    const newItem = item ?? this.initial;

    const row = [];
    for (let i = 0; i < c; i++) {
      row.push({ id: uuidv4(), context: {}, properties: {}, item: newItem });
    }

    return { id: uuidv4(), context: {}, properties: {}, cols: row };
  }

  removeRow(rowNum: number) {
    this.board.rows.splice(rowNum, 1);
  }

  clear() {
    this.board.rows = [];
  }

  // NOTE: does not copy previous board's id
  copy(other: Board2DController<ItemType>) {
    this.clear();
    const { board, initial } = other;
    this.initial = initial;

    const rows = board.rows.map((row) => ({
      id: row.id,
      cols: row.cols.map((col) => ({
        ...col,
        context: { ...col.context },
        properties: { ...col.properties },
      })),
      context: { ...row.context },
      properties: { ...row.properties },
    }));
    this.board.rows = rows;
  }
}
