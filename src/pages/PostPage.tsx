import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {PostType} from "../api/api";
import {Post} from "../features/posts/components/Post";
import {AppStateType} from "../state/store";
import {fetchPosts} from "../features/posts/bll/reducer";

export const PostPage: React.FC = () => {

    const items = useSelector<AppStateType, PostType[]>(state => state.posts.items)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    return (
        <div>
            {items.map((i: PostType) => <Post key={i.id} post={i}/>)}
        </div>
    )
}
