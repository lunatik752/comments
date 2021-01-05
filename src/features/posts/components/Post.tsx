import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updatePost} from "../bll/posts-reducer";
import {AppStateType} from "../../../state/store";
import {updateAuthor} from '../bll/authors-reducer';
import {Comment} from "./Comment";
import {fetchPostComments} from "../bll/comments-reducer";


export const Post: React.FC<{ postId: number }> = React.memo(({postId}) => {

    const post = useSelector((state: AppStateType) => state.posts.byId[postId])
    const author = useSelector((state: AppStateType) => state.authors.byId[post.authorId])

    const [editModePost, setEditModePost] = useState(false)
    const [editModeAuthor, setEditModeAuthor] = useState(false)
    const [commentText, setCommentText] = useState(post.text)
    const [authorName, setAuthorName] = useState(author.name)
    const dispatch = useDispatch()

    const changePostText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(e.currentTarget.value)
    }, [])

    const changeAuthorName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAuthorName(e.currentTarget.value)
    }, [])

    const updatePostText = useCallback(() => {
        dispatch(updatePost(post.id, commentText))
        setEditModePost(false)
    }, [dispatch, post.id, commentText])

    const updateAuthorName = useCallback(() => {
        dispatch(updateAuthor(author.id, authorName))
        setEditModeAuthor(false)
    }, [dispatch, author.id, authorName])

    const showAllComments = useCallback(() => {
        dispatch(fetchPostComments(postId))
    }, [dispatch, postId])

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
            {!editModePost
                ? <span onDoubleClick={() => setEditModePost(true)}>{post.text}</span>
                : <textarea
                    autoFocus
                    value={commentText}
                    onChange={changePostText}
                    onBlur={updatePostText}/>}
            <br/>
            Likes: {post.likes}
            <hr/>
            Comments:
            <ul>
                {post.commentsIds.map(id => <Comment key={id} commentId={id} postId={postId}/>)}
            </ul>
            <button onClick={showAllComments}>Show all comments</button>
            <hr/>
        </div>
    );
})


