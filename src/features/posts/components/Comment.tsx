import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../state/store";
import {deleteComment} from "../bll/comments-reducer";

export const Comment: React.FC<{ commentId: number, postId: number }> = React.memo(({commentId, postId}) => {
    const comment = useSelector((state: AppStateType) => state.comments.byId[commentId])
    const author = useSelector((state: AppStateType) => state.authors.byId[comment.authorId])
    const dispatch = useDispatch()

    const deleteCommentHandle = useCallback(() => {
        dispatch(deleteComment(postId, commentId))
    }, [dispatch, postId, commentId])


    return (
        <li>
            <b>{author.name}   </b>
            {comment.text}  <button onClick={deleteCommentHandle}>x</button>
        </li>
    )
})
