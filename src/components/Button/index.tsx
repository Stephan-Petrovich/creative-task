import { type ReactElement } from "react";
import "./style.css";

export interface IButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

const Button = ({
    label,
    onClick,
    disabled = false,
}: IButtonProps): ReactElement => {
    return (
        <button className="styled-button" onClick={onClick} disabled={disabled}>
            {label.toUpperCase()}
        </button>
    );
};

export default Button;
