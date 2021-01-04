import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updatePost} from "../bll/posts-reducer";
import {AppStateType} from "../../../state/store";
import { updateAuthor } from '../bll/authors-reducer';


export const Post: React.FC<{ postId: number }> = React.memo(({postId}) => {

    const post = useSelector((state: AppStateType) => state.posts.byId[postId])
    const author = useSelector((state: AppStateType) => state.authors.byId[post.authorId])

    const [editModeComment, setEditModeComment] = useState(false)
    const [editModeAuthor, setEditModeAuthor] = useState(false)
    const [commentText, setCommentText] = useState(post.text)
    const [authorName, setAuthorName] = useState(author.name)
    const dispatch = useDispatch()

    const changeCommentText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(e.currentTarget.value)
    }, [])

    const changeAuthorName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAuthorName(e.currentTarget.value)
    }, [])

    const updatePostText = useCallback(() => {
        dispatch(updatePost(post.id, commentText))
        setEditModeComment(false)
    }, [dispatch, post.id, commentText])

    const updateAuthorName = useCallback(() => {
        dispatch(updateAuthor(author.id, authorName))
        setEditModeAuthor(false)
    }, [dispatch, author.id, authorName])

    return (
        <div>
            {!editModeAuthor
                ? <b onDoubleClick={() => setEditModeAuthor(true)}>{author.name}</b>
            : <input
                    autoFocus
                    value={authorName}
                    onChange={changeAuthorName}
                    onBlur={updateAuthorName}/>}
            <br/>
            {!editModeComment
                ? <span onDoubleClick={() => setEditModeComment(true)}>{post.text}</span>
                : <textarea
                    autoFocus
                    value={commentText}
                    onChange={changeCommentText}
                    onBlur={updatePostText}/>}
            <br/>
            Likes: {post.likes}
            <hr/>
        </div>
    );
})

