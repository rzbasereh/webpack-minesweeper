import { IBoard, IBox } from '../types/board';

const initialBoard = (rows: number, cols: number) => {
  const initialRow: IBox[] = [];
  const initBox: IBox = { isMine: false, visible: false, value: '', type: '' };
  for (let col = 0; col < cols; col++) {
    initialRow.push({ ...initBox });
  }

  const board: IBoard = [];
  for (let row = 0; row < rows; row++) {
    board.push(structuredClone(initialRow));
  }

  return board;
};

const getRandomBox = (rows: number, cols: number) => {
  const totalBoxes = rows * cols;
  const boxNum = Math.floor(Math.random() * totalBoxes);
  const box = {
    x: Math.floor(boxNum / cols),
    y: boxNum % cols,
  };
  return box;
};

const insertMines = (board: IBoard, mines: number) => {
  const newBoard = structuredClone(board);
  const [rows, cols] = [newBoard.length, newBoard[0].length];

  let remainedMines = mines;
  while (remainedMines) {
    const box = getRandomBox(rows, cols);
    if (!newBoard[box.x][box.y].isMine) {
      newBoard[box.x][box.y].isMine = true;
      remainedMines--;
    }
  }

  return newBoard;
};

const isBoxInBoard = (board: IBoard, x: number, y: number) => {
  const [rows, cols] = [board.length, board[0].length];
  if (x >= 0 && y >= 0 && x < rows && y < cols) return true;
  return false;
};

const getNeighborBoxes = (board: IBoard, x: number, y: number) => {
  const rowNbr = [-1, -1, -1, 0, 0, 1, 1, 1];
  const colNbr = [-1, 0, 1, -1, 1, -1, 0, 1];

  const boxes: { x: number; y: number }[] = [];
  for (let i = 0; i < 8; i++) {
    if (isBoxInBoard(board, x + rowNbr[i], y + colNbr[i])) {
      boxes.push({ x: x + rowNbr[i], y: y + colNbr[i] });
    }
  }
  return boxes;
};

const calcNeighborMines = (board: IBoard, x: number, y: number) => {
  const neighborBoxes = getNeighborBoxes(board, x, y);

  let count = 0;
  for (const box of neighborBoxes) {
    if (board[box.x][box.y].isMine) {
      count++;
    }
  }

  if (count) return String(count);
  return '';
};

const insertNeighborNumbers = (board: IBoard) => {
  const newBoard = structuredClone(board);
  const [rows, cols] = [newBoard.length, newBoard[0].length];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!newBoard[i][j].isMine) {
        newBoard[i][j].value = calcNeighborMines(newBoard, i, j);
      }
    }
  }

  return newBoard;
};

export const generateGameBoard = (rows: number, cols: number, mines: number) => {
  let board = initialBoard(rows, cols);
  board = insertMines(board, mines);
  board = insertNeighborNumbers(board);
  return board;
};

export const showBoxValue = (board: IBoard, x: number, y: number, checked: { x: number; y: number }[] = []) => {
  let newBoard = structuredClone(board);
  let showedCount = 0;
  if (newBoard[x][y].isMine) return { board: newBoard, showedCount };

  if (!newBoard[x][y].visible) {
    newBoard[x][y].visible = true;
    showedCount++;
  }

  if (!newBoard[x][y].value) {
    const neighborBoxes = getNeighborBoxes(newBoard, x, y);
    for (const box of neighborBoxes) {
      const isChecked = !!checked.find(({ x, y }) => x === box.x && y === box.y);
      if (!isChecked) {
        checked.push({ x, y });
        const { board: modifiedBoard, showedCount: newShowedCount } = showBoxValue(newBoard, box.x, box.y, checked);
        newBoard = modifiedBoard;
        showedCount += newShowedCount;
      }
    }
  }

  return { board: newBoard, showedCount };
};

export const showMines = (board: IBoard, x: number, y: number) => {
  const newBoard = structuredClone(board);
  const [rows, cols] = [newBoard.length, newBoard[0].length];

  newBoard[x][y].type = 'failure';

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (newBoard[i][j].isMine) {
        newBoard[i][j].visible = true;
      }
    }
  }

  return newBoard;
};

export const isWin = (visibleBoxes: number, rows: number, cols: number, mines: number) => {
  const totalBoxes = rows * cols;
  if (totalBoxes === visibleBoxes + mines) {
    return true;
  }
  return false;
};
