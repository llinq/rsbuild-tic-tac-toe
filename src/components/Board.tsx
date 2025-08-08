import { useState } from 'react';
import Square from './Square';
import type { SquareValue } from '../types';
import { flushSync } from 'react-dom';

export default function Board() {
    const [currentValue, setCurrentValue] = useState<SquareValue>('X');
    const [squares, setSquares] = useState<(SquareValue | null)[]>(Array(9).fill(null));

    const checkWinner = (squaresToCheck: (SquareValue | null)[]): SquareValue | null => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (squaresToCheck[a] && squaresToCheck[a] === squaresToCheck[b] && squaresToCheck[a] === squaresToCheck[c]) {
                return squaresToCheck[a]!;
            }
        }
        return null;
    };

    const handleSquareClick = (index: number) => {
        if (squares[index] !== null) return;

        const newSquares = [...squares];
        newSquares[index] = currentValue;

        flushSync(() => {
            setSquares(newSquares);
        });

        const winner = checkWinner(newSquares);

        if (winner) {
            setTimeout(() => {
                alert(`${winner} wins!`);
                setSquares(Array(9).fill(null));
                setCurrentValue('X');
            });

        } else {
            const isTie = newSquares.every(square => square !== null);
            if (isTie) {
                alert('Empate!');
                setSquares(Array(9).fill(null));
                setCurrentValue('X');
            } else {
                setCurrentValue(prev => prev === 'X' ? 'O' : 'X');
            }
        }
    };

    return (
        <div className="board">
            {squares.map((value, index) => {
                return (
                    <Square
                        key={index}
                        value={value}
                        onClick={() => handleSquareClick(index)}
                    />
                );
            })}
        </div>
    );
}