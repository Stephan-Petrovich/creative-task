import { ReactElement } from "react";
import "./style.css";

interface IErrorProps {
    label?: string;
}

const DEFAULT_VALUE_LABEL: string =
    "Oops! An error occurred, please try again later.";

const Error = ({ label = DEFAULT_VALUE_LABEL }: IErrorProps): ReactElement => {
    return <div className="error-alert-box">{label}</div>;
};

export default Error;
