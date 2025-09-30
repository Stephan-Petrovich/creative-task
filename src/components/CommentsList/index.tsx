import Comment from "../Comment";
import React, { ReactElement } from "react";
import { IComment } from "@src/domains/types";
import "./style.css";

interface ICommentsListProps {
    comments: IComment[];
}

const CommentsList = React.memo(
    ({ comments }: ICommentsListProps): ReactElement => {
        return (
            <div className="comments-list">
                {comments.map((comment: IComment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        );
    }
);

export default CommentsList;
