import Button from "@src/components/Button";
import Loading from "@src/components/Loading";
import CommentsList from "@src/components/CommentsList";
import FormAddComment from "@src/components/FormAddComment";
import { getPostById, getUserById, getCommentsById } from "@src/api";
import { capitalizeFirstLetter } from "@src/utils/constants";
import { ReactElement, useEffect, useState } from "react";
import { IComment, IPost, IUser } from "@src/domains";
import { useParams } from "react-router-dom";
import "./style.css";

const DetailPostPage = (): ReactElement => {
    const [currentPost, setCurrentPost] = useState<IPost | null>(null);
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [currentComments, setCurrentComments] = useState<IComment[]>([]);

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    const { id } = useParams<{ id: string }>();
    const postId = parseInt(id || "");

    const handleOpenAddForm = (): void => {
        setIsFormOpen(true);
    };

    const handleCreateComment = (newComment: IComment): void => {
        setCurrentComments((prevComments) => {
            if (!prevComments) {
                return [newComment];
            }

            return [newComment, ...prevComments];
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (isNaN(postId)) {
                return;
            }

            try {
                const post: IPost = await getPostById(postId);
                setCurrentPost(post);

                const user: IUser = await getUserById(post.userId);
                setCurrentUser(user);

                const comments: IComment[] = await getCommentsById(postId);
                setCurrentComments(comments);
            } catch (error) {
                return console.error(
                    "Возникла ошибка при поиске данных: ",
                    error
                );
            }
        };

        fetchData();
    }, [postId]);

    if (!currentPost || !currentUser) {
        return <Loading />;
    }

    return (
        <div className="detail-post-page">
            <div className="current-post-container">
                <h1 className="current-post-author">{`User: ${currentUser.username}`}</h1>
                <h2 className="current-post-title">
                    {`Headline: ${capitalizeFirstLetter(currentPost.title)}.`}
                </h2>

                <div className="current-post-body">
                    <p>{`Body: ${capitalizeFirstLetter(currentPost.body)}.`}</p>
                </div>
            </div>

            <div className="comments-of-current-post">
                <h3 className="comments-header">Comments on the post:</h3>

                <div className="add-comment-button">
                    <Button label="Add comment" onClick={handleOpenAddForm} />
                </div>

                <CommentsList comments={currentComments} />
            </div>

            {isFormOpen && (
                <div className="add-comment-form-container">
                    <div className="add-comment-form-wrapper">
                        <FormAddComment
                            loadNewComment={handleCreateComment}
                            postId={postId}
                            handleClose={(isOpen) => setIsFormOpen(isOpen)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailPostPage;
