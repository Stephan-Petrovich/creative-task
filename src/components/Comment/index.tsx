import { capitalizeFirstLetter } from "@src/utils/constants";
import { IComment } from "@src/domains/types";
import { ReactElement } from "react";
import "./style.css";

interface ICommentProps {
    comment: IComment;
}

const Comment = ({ comment }: ICommentProps): ReactElement => {
    return (
        <div className="comment-container">
            <div className="comment-header">
                <header className="comment-author">{`Comment from: ${comment.email}`}</header>
                <h3 className="comment-name">
                    {capitalizeFirstLetter(comment.name)}
                </h3>
            </div>
            <div className="comment-body">
                <p>{capitalizeFirstLetter(`${comment.body}.`)}</p>
            </div>
        </div>
    );
};

export default Comment;
