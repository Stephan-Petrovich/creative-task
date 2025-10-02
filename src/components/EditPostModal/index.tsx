import Button from "../Button";
import TextArea, { TextareaSizes } from "../Textarea";
import Input, { TypesOfInput, InputSizes } from "../Input";
import { COUNT_OF_TEXTAREA_COLS } from "@src/utils/constants";
import { capitalizeFirstLetter } from "@src/utils/functions";
import { usePostContext } from "@src/Contexts/postsContext";
import { FormEvent, ReactElement, useState } from "react";
import { deletePost, updatePost } from "@src/api";
import { useNavigate } from "react-router-dom";
import { IPost } from "@src/domains/types";
import "./style.css";

interface IEditPostModalProps {
    post: IPost;
    onUpdatePost: (updatedPost: IPost) => void;
    onClose: () => void;
}

const EditPostModal = ({
    post,
    onUpdatePost,
    onClose,
}: IEditPostModalProps): ReactElement => {
    const navigate = useNavigate();
    const { removePost } = usePostContext();

    const [title, setTitle] = useState<string>(
        capitalizeFirstLetter(post.title)
    );
    const [body, setBody] = useState<string>(capitalizeFirstLetter(post.body));

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const textOfSubmitButton: string = isSubmitting
        ? "Loading..."
        : "Update post";

    const handleChangeTitle = (query: string): void => {
        setTitle(query);
    };

    const handleChangeBody = (text: string): void => {
        setBody(text);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        setIsSubmitting(true);

        try {
            const updatedPost = await updatePost(post.id, { title, body });

            onUpdatePost(updatedPost);

            onClose();
        } catch (error) {
            console.error("Failed update post");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeletePost = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) {
            return;
        }

        setIsSubmitting(true);

        try {
            await deletePost(post.id);

            removePost(post.id);

            onClose();

            navigate("/posts");
        } catch (error) {
            console.error("Delete post error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="edit-modal-container">
            <h2>Edit Post</h2>

            <form className="edit-post-form" onSubmit={handleSubmit}>
                <div className="form-post-title">
                    <label>Title: </label>
                    <Input
                        value={title}
                        onChange={handleChangeTitle}
                        variant={TypesOfInput.PRIMARY}
                        size={InputSizes.MEDIUM}
                        required
                        autoFocus
                    />
                </div>

                <div className="form-post-body">
                    <label>Content: </label>
                    <TextArea
                        value={body}
                        onChange={handleChangeBody}
                        size={TextareaSizes.MEDIUM}
                        cols={COUNT_OF_TEXTAREA_COLS}
                        required
                    />
                </div>

                <div className="modal-actions">
                    <Button
                        type="submit"
                        label={textOfSubmitButton}
                        disabled={isSubmitting}
                    />
                    <Button label="Delete" onClick={handleDeletePost} />
                    <Button
                        label="Cancel"
                        onClick={() => {
                            onClose();
                        }}
                    />
                </div>
            </form>
        </div>
    );
};

export default EditPostModal;
