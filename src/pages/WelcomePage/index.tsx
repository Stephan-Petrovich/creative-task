import { Link } from "react-router-dom";
import { ReactElement } from "react";
import "./style.css";

const WelcomePage = (): ReactElement => {
    return (
        <div className="welcome-page-container">
            <div className="welcome-page-header">
                <h3 className="welcome-title">Welcome to the post feed!</h3>
                <h5 className="instruction">
                    To go to the posts page, click on the button
                </h5>
                <div className="link-container">
                    <Link to="/posts">Go to the main page</Link>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
