import Button from "../Button";
import CommentsList from "../CommentsList";
import { IComment } from "@src/domains/types";
import { ReactElement } from "react";
import "./style.css";

interface ICommentsBlock {
    handleOpenForm: () => void;
    comments: IComment[];
}

const CommentsBlock = ({
    comments,
    handleOpenForm,
}: ICommentsBlock): ReactElement => {
    return (
        <div className="comments-of-current-post">
            <h3 className="comments-header">Comments on the post:</h3>

            <div className="add-comment-button">
                <Button label="Add comment" onClick={handleOpenForm} />
            </div>

            <CommentsList comments={comments} />
        </div>
    );
};
export default CommentsBlock;
