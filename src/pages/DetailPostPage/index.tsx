import Button from "@src/components/Button";
import Loading from "@src/components/Loading";
import CommentsList from "@src/components/CommentsList";
import EditPostModal from "@src/components/EditPostModal";
import FormAddComment from "@src/components/FormAddComment";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { getPostById, getUserById, getCommentsById } from "@src/api";
import { capitalizeFirstLetter } from "@src/utils/constants";
import { IComment, IPost, IUser } from "@src/domains/types";
import { useParams } from "react-router-dom";
import "./style.css";

const DetailPostPage = (): ReactElement => {
    const [currentPost, setCurrentPost] = useState<IPost | null>(null);
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [currentComments, setCurrentComments] = useState<IComment[]>([]);

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

    const { id } = useParams<{ id: string }>();
    const postId = parseInt(id || "");

    const handleOpenAddForm = useCallback((isOpen: boolean) => {
        setIsFormOpen(isOpen);
    }, []);

    const handleOpenEditModal = useCallback((isOpen: boolean) => {
        setIsEditModalOpen(isOpen);
    }, []);

    const handleCreateComment = useCallback((newComment: IComment): void => {
        setCurrentComments((prevComments) => {
            if (!prevComments) {
                return [newComment];
            }

            return [newComment, ...prevComments];
        });
    }, []);

    const handlePostUpdated = (updatedPost: IPost): void => {
        setCurrentPost(updatedPost);
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

                <div className="edit-post-button-container">
                    <Button
                        label="Edit post"
                        onClick={() => {
                            handleOpenEditModal(true);
                        }}
                    />
                </div>
            </div>

            <div className="comments-of-current-post">
                <h3 className="comments-header">Comments on the post:</h3>

                <div className="add-comment-button">
                    <Button
                        label="Add comment"
                        onClick={() => {
                            handleOpenAddForm(true);
                        }}
                    />
                </div>

                <CommentsList comments={currentComments} />
            </div>

            {isFormOpen && (
                <div className="add-comment-form-container">
                    <div className="add-comment-form-wrapper">
                        <FormAddComment
                            loadNewComment={handleCreateComment}
                            postId={postId}
                            handleClose={() => handleOpenAddForm(false)}
                        />
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="edit-post-form-container">
                    <div className="edit-post-form-wrapper">
                        <EditPostModal
                            post={currentPost}
                            onUpdatePost={handlePostUpdated}
                            onClose={() => handleOpenEditModal(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailPostPage;
