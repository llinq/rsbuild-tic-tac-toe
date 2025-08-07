import { Fragment } from "react/jsx-runtime";
import type { Value } from "../types";

type SquareProps = {
    index: number;
    value: Value | null;
    onClick: (index: number) => void;
};

export default function Square({ value, index, onClick }: SquareProps) {
    return (
        <button
            className="square"
            disabled={!!value}
            onClick={() => onClick(index)}
        >
            {value ?? <Fragment>&nbsp;</Fragment>}
        </button>
    );
}

