import { Fragment } from "react/jsx-runtime";
import type { SquareType } from "../types";

export default function Square({ value, onClick }: SquareType) {
    return (
        <button
            className="square"
            disabled={!!value}
            onClick={onClick}
        >
            {value ?? <Fragment>&nbsp;</Fragment>}
        </button>
    );
}

