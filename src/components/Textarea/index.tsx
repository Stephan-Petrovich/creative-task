import { ReactElement, CSSProperties, ChangeEvent } from "react";
import "./style.css";

export enum TextareaSizes {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
}

export interface ITextAreaProps {
    className?: string;
    value: string;
    onChange: (text: string) => void;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    rows?: number;
    cols?: number;
    size?: TextareaSizes;
    resizable?: boolean;
    style?: CSSProperties;
}

const TEXTAREA_DEFAULT_CLASSNAME: string = "textarea";
const TEXTAREA_DEFAULT_VALUE: string = "";
const DEFAULT_COUNT_ROWS: number = 5;
const DEFAULT_COUNT_COLS: number = 30;

const TextArea = ({
    className = TEXTAREA_DEFAULT_CLASSNAME,
    value = TEXTAREA_DEFAULT_VALUE,
    onChange,
    placeholder,
    disabled = false,
    required = false,
    autoFocus = false,
    resizable = false,
    size,
    rows = DEFAULT_COUNT_ROWS,
    cols = DEFAULT_COUNT_COLS,
    style,
}: ITextAreaProps): ReactElement => {
    const resizableValue: string = !resizable ? "not-resizable" : "resizable";

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        onChange(event.target.value);
    };

    return (
        <textarea
            value={value}
            onChange={handleChange}
            className={`${className} ${size} ${resizableValue} primary-text`}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            autoFocus={autoFocus}
            rows={rows}
            cols={cols}
            style={style}
        />
    );
};

export default TextArea;
