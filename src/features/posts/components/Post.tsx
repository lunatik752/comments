import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updatePosts} from "../bll/reducer";
import {AppStateType} from "../../../state/store";


export const Post: React.FC<{ postId: number }> = React.memo(({postId}) => {

    const post = useSelector((state: AppStateType) => state.posts.byId[postId])

    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(post.text)
    const dispatch = useDispatch()

    const changeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.currentTarget.value)
    }, [])

    const onBlurHandle = useCallback(() => {
        dispatch(updatePosts(post.id, text))
        setEditMode(false)
    }, [dispatch, post.id, text])

    return (
        <div>
            <b>{post.author.name}</b>
            <br/>
            {!editMode
                ? <span onDoubleClick={() => setEditMode(true)}>{post.text}</span>
                : <textarea
                    value={text}
                    onChange={changeText}
                    onBlur={onBlurHandle}/>}
            <br/>
            Likes: {post.likes}
            <hr/>
        </div>
    );
})

