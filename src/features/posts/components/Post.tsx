import React, {ChangeEvent, useCallback, useState} from 'react';
import {PostType} from "../../../api/api";
import {useDispatch} from "react-redux";
import {updatePosts} from "../bll/reducer";


export const Post: React.FC<{ post: PostType }> = React.memo(({post}) => {

    console.log(post)

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

