export type SquareValue = 'X' | 'O';

export type SquareType = {
    value: SquareValue | null;
    onClick: () => void;
};