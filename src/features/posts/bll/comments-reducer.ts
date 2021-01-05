import {api, CommentApiType} from "../../../api/api";
import {Dispatch} from "redux";
import {fetchPostSuccess, mapToLookupTable} from "./posts-reducer";

export type CommentType = Omit<CommentApiType, 'author'> & { authorId: number }

const initialState = {
    byId: {} as { [key: string]: CommentType }
}

export const commentsReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "FETCH_POST_SUCCESS": {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...mapToLookupTable(action.payload.posts.map(p => p.lastComments).flat().map(c => {
                            const comment: CommentType = {
                                id: c.id,
                                authorId: c.author.id,
                                text: c.text
                            }
                            return comment
                        })
                    )
                }
            }
        }
        case "FETCH_POST_COMMENTS_SUCCESS": {
            const lookupTable = mapToLookupTable(action.payload.comments
                .map(c => {
                    const comment: CommentType = {
                        id: c.id,
                        authorId: c.author.id,
                        text: c.text
                    }
                    return comment
                })
            )
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...lookupTable
                }
            }
        }
        case "DELETE_COMMENT_SUCCESS": {
            const byIdCopy = {
                ...state.byId
            }
            delete byIdCopy[action.payload.commentId]
            return {
                ...state,
                byId: byIdCopy
            }
        }
    }
    return state
}

type ActionsType =
    | ReturnType<typeof fetchPostSuccess>
    | ReturnType<typeof fetchPostCommentsSuccess>
    | ReturnType<typeof deleteCommentSuccess>

export const fetchPostCommentsSuccess = (postId: number, comments: CommentApiType[]) => ({
    type: 'FETCH_POST_COMMENTS_SUCCESS',
    payload: {comments, postId}
} as const)

export const deleteCommentSuccess = (postId: number, commentId: number) => ({
    type: 'DELETE_COMMENT_SUCCESS',
    payload: {postId, commentId}
} as const)

export const fetchPostComments = (postId: number) => async (dispatch: Dispatch) => {
    const comments = await api.getCommentsForPost(postId)
    dispatch(fetchPostCommentsSuccess(postId, comments))
}

export const deleteComment = (postId: number, commentId: number) => async (dispatch: Dispatch) => {
    const res = await api.deleteComment(postId, commentId)
    dispatch(deleteCommentSuccess(postId, commentId))
}

