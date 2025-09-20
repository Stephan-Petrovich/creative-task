import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IFinalPost } from "@src/domains";
import { getPostById } from "@src/api";

const DetailPostPage = (): ReactElement => {
    const [currentPost, setCurrentPost] = useState<IFinalPost | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { id } = useParams<{ id: string }>();
    const postId = parseInt(id || "");

    useEffect(() => {
        const fetchPostData = async () => {
            if (isNaN(postId)) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);

                const fetchedPost: IFinalPost = await getPostById(postId);
                setCurrentPost(fetchedPost);
            } catch (error) {
                return console.error(
                    "Возникла ошибка при поиске конкретного поста: ",
                    error
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchPostData();
    }, [postId]);

    if (isLoading) return <div>Loading...</div>;

    return <div className="detail-post-page"></div>;
};

export default DetailPostPage;
