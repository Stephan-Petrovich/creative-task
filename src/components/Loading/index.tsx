import { ReactElement } from "react";
import "./style.css";

interface ILoadingProps {
    label?: string;
}

const DEFAULT_LOADING_TEXT: string = "Wait a second, loading...";

const Loading = ({
    label = DEFAULT_LOADING_TEXT,
}: ILoadingProps): ReactElement => {
    return <div className="loading-alert-box">{label}</div>;
};

export default Loading;
