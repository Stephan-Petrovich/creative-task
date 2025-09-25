import Comment from "../Comment";
import { IComment } from "@src/domains";
import { ReactElement } from "react";
import "./style.css";

interface ICommentsListProps {
    comments: IComment[];
}

const CommentsList = ({ comments }: ICommentsListProps): ReactElement => {
    return (
        <div className="comments-list">
            {comments.map((comment: IComment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentsList;
