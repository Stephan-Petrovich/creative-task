import Error from "../Error";
import Button from "../Button";
import TextArea, { TextareaSizes } from "../Textarea";
import Input, { InputSizes, TypesOfInput } from "../Input";
import { countOfTextareaCols } from "@src/utils/constants";
import { FormEvent, ReactElement, useState } from "react";
import { addNewComment } from "@src/api";
import { IComment } from "@src/domains/types";
import "./style.css";

interface IFormAddCommentProps {
    loadNewComment: (newComment: IComment) => void;
    postId: number;
    handleClose: (isOpen: boolean) => void;
}

const FormAddComment = ({
    loadNewComment,
    postId,
    handleClose,
}: IFormAddCommentProps): ReactElement => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const textOfSubmitButton: string = isSubmitting
        ? "Loading..."
        : "Add comment";

    const textOfOpenButton: string = "Cancel the operation";

    const handleChangeName = (name: string): void => {
        setName(name);
    };

    const handleChangeEmail = (email: string): void => {
        setEmail(email);
    };

    const handleChangeContent = (text: string): void => {
        setContent(text);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        setIsSubmitting(true);

        try {
            const newComment: IComment = await addNewComment(
                postId,
                name,
                email,
                content
            );

            loadNewComment(newComment);

            setName("");
            setEmail("");
            setContent("");
        } catch (error) {
            setError("Error adding comments");
            console.error("Add comment error:", error);
        } finally {
            setIsSubmitting(false);
            handleClose(false);
        }
    };

    const handleCloseForm = (): void => {
        handleClose(false);
    };

    return (
        <form className="add-comment-form" onSubmit={handleSubmit}>
            <h3 className="form-title">Add comment</h3>

            {error && <Error label={error} />}

            <div className="form-row">
                <Input
                    value={name}
                    placeholder="Input your username..."
                    onChange={handleChangeName}
                    variant={TypesOfInput.PRIMARY}
                    size={InputSizes.MEDIUM}
                    required
                    autoFocus
                />
            </div>

            <div className="form-row">
                <Input
                    value={email}
                    placeholder="Input your email..."
                    type="email"
                    onChange={handleChangeEmail}
                    variant={TypesOfInput.PRIMARY}
                    size={InputSizes.MEDIUM}
                    required
                />
            </div>

            <div className="form-row">
                <TextArea
                    value={content}
                    onChange={handleChangeContent}
                    placeholder="Write your comment..."
                    size={TextareaSizes.MEDIUM}
                    cols={countOfTextareaCols}
                    required
                />
            </div>

            <div className="submit-button-container">
                <Button
                    type="submit"
                    label={textOfSubmitButton}
                    disabled={isSubmitting}
                />
            </div>

            <div className="close-button-container">
                <Button label={textOfOpenButton} onClick={handleCloseForm} />
            </div>
        </form>
    );
};

export default FormAddComment;
