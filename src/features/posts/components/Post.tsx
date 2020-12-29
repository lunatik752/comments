import React from 'react';
import {PostType} from "../../../api/api";


export const Post: React.FC<{ post: PostType }> = ({post}) => {
    return (
        <div>
            <b>{post.author.name}</b>
            <span>{post.text}</span>
            <hr/>
        </div>
    );
}

