import {
    ReactElement,
    CSSProperties,
    ChangeEvent,
    HTMLInputTypeAttribute,
} from "react";
import "./style.css";

export enum TypesOfInput {
    PRIMARY = "primary",
    SECONDARY = "secondary",
}

export enum InputSizes {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
}

export interface IInputProps {
    className?: string;
    value: string;
    name?: string;
    onChange: (query: string) => void;
    variant?: TypesOfInput;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    size?: InputSizes;
    style?: CSSProperties;
}

const INPUT_DEFAULT_CLASSNAME: string = "input";
const INPUT_DEFAULT_VALUE: string = "";
const INPUT_DEFAULT_NAME: string = "input";

const Input = ({
    className = INPUT_DEFAULT_CLASSNAME,
    value = INPUT_DEFAULT_VALUE,
    name = INPUT_DEFAULT_NAME,
    onChange,
    type,
    variant,
    placeholder,
    disabled = false,
    required = false,
    autoFocus = false,
    size,
    style,
}: IInputProps): ReactElement => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        onChange(event.target.value);
    };

    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            className={`${className} ${variant} ${size} primary-text`}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            autoFocus={autoFocus}
            style={style}
        />
    );
};

export default Input;
