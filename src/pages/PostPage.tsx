import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Post} from "../features/posts/components/Post";
import {AppStateType} from "../state/store";
import {fetchPosts} from "../features/posts/bll/reducer";

export const PostPage: React.FC = () => {

    const ids = useSelector<AppStateType, number[]>(state => state.posts.allIds)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    return (
        <div>
            {ids.map(id => <Post key={id} postId={id}/>)}
        </div>
    )
}
