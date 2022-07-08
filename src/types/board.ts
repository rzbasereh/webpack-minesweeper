export interface IBox {
  isMine: boolean;
  visible: boolean;
  value: string;
  type: '' | 'flag' | 'failure';
}

export type IBoard = IBox[][];
