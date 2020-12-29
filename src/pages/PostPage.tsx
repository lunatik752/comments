import React from "react";
import {useSelector} from "react-redux";
import { PostType } from "../api/api";
import { Post } from "../features/posts/components/Post";
import {AppStateType} from "../state/store";

export const PostPage: React.FC = () => {

    const items = useSelector<AppStateType, PostType[]>(state => state.posts.items)

    return (
        <div>
            {items.map((i: PostType) => <Post key={i.id} post={i}/> )}
        </div>
    )
}
