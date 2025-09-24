import { ReactElement } from "react";
import "./style.css";

const Error = (): ReactElement => {
    return (
        <div className="error-alert-box">
            Oops! An error occurred, please try again later.
        </div>
    );
};

export default Error;
