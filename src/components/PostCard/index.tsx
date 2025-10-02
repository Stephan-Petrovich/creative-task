import React, { ReactElement } from "react";
import { capitalizeFirstLetter } from "@src/utils/functions";
import { IPost } from "@src/domains/types";
import { Link } from "react-router-dom";
import "./style.css";

interface IPostCardProps {
    post: IPost;
}

const PostCard = React.memo(({ post }: IPostCardProps): ReactElement => {
    const shortText =
        post.body.length > 100
            ? post.body.substring(0, 100) + "..."
            : post.body;

    return (
        <div className="post-card">
            <div className="post-header">
                <h4 className="post-author">{post.userName}</h4>
                <h3 className="post-title">
                    {capitalizeFirstLetter(post.title)}
                </h3>
            </div>
            <div className="post-body">
                <p>{capitalizeFirstLetter(shortText)}</p>
            </div>
            <div className="post-link">
                <Link to={`/posts/${post.id}`}>Open fully</Link>
            </div>
        </div>
    );
});

export default PostCard;
