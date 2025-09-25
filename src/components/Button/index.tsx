import { type ReactElement } from "react";
import "./style.css";

export interface IButtonProps {
    type?: "button" | "submit" | "reset";
    label: string;
    onClick?: () => void;
    disabled?: boolean;
}

const Button = ({
    type,
    label,
    onClick,
    disabled = false,
}: IButtonProps): ReactElement => {
    return (
        <button
            type={type}
            className="styled-button"
            onClick={onClick}
            disabled={disabled}
        >
            {label.toUpperCase()}
        </button>
    );
};

export default Button;
