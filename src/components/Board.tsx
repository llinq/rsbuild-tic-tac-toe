import { useState } from 'react';
import Square from './Square';
import type { Value } from '../types';
import { flushSync } from 'react-dom';

export default function Board() {
    const [currentValue, setCurrentValue] = useState<Value>('X');
    const [squaresValue, setSquaresValue] = useState<(Value | null)[]>(Array(9).fill(null));

    const checkWinner = (squares: (Value | null)[]): Value | null => {
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
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleSquareClick = (index: number) => {
        if (squaresValue[index] !== null) return;

        const newSquares = [...squaresValue];
        newSquares[index] = currentValue;

        flushSync(() => {
            setSquaresValue(newSquares);
        });

        const winner = checkWinner(newSquares);

        if (winner) {
            setTimeout(() => {
                alert(`${winner} wins!`);
                setSquaresValue(Array(9).fill(null));
                setCurrentValue('X');
            });
        } else {
            const isTie = newSquares.every(square => square !== null);
            if (isTie) {
                alert('Empate!');
                setSquaresValue(Array(9).fill(null));
                setCurrentValue('X');
            } else {
                setCurrentValue(prev => prev === 'X' ? 'O' : 'X');
            }
        }
    };

    return (
        <div className="board">
            <div className="row">
                <Square index={0} value={squaresValue[0]} onClick={handleSquareClick} />
                <Square index={1} value={squaresValue[1]} onClick={handleSquareClick} />
                <Square index={2} value={squaresValue[2]} onClick={handleSquareClick} />
            </div>
            <div className="row">
                <Square index={3} value={squaresValue[3]} onClick={handleSquareClick} />
                <Square index={4} value={squaresValue[4]} onClick={handleSquareClick} />
                <Square index={5} value={squaresValue[5]} onClick={handleSquareClick} />
            </div>
            <div className="row">
                <Square index={6} value={squaresValue[6]} onClick={handleSquareClick} />
                <Square index={7} value={squaresValue[7]} onClick={handleSquareClick} />
                <Square index={8} value={squaresValue[8]} onClick={handleSquareClick} />
            </div>
        </div>
    );
}