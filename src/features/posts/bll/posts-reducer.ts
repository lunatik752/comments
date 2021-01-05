import {api, PostApiType} from "../../../api/api";
import {Dispatch} from "redux";
import {deleteCommentSuccess, fetchPostCommentsSuccess} from "./comments-reducer";

export type PostType = {
    id: number
    text: string
    likes: number
    authorId: number
    commentsIds: number[]
}

const initialState = {
    // items: [] as PostType[],
    allIds: [] as number[],
    byId: {} as { [key: string]: PostType }
}

type LookupTableType<T> = {
    [key: string]: T
}

export const mapToLookupTable = <T extends { id: number }>(items: T[]): LookupTableType<T> => {
    const acc: LookupTableType<T> = {}
    return items.reduce((acc, item) => {
        acc[item.id] = item
        return acc
    }, acc)
}

export const postReducer = (state = initialState, action: PostReducerActionsType) => {
    switch (action.type) {
        case "FETCH_POST_SUCCESS": {
            return {
                ...state,
                allIds: action.payload.posts.map(p => p.id),
                byId: mapToLookupTable(action.payload.posts.map(p => {
                    const copy: PostType = {
                        id: p.id,
                        text: p.text,
                        likes: p.likes,
                        authorId: p.author.id,
                        commentsIds: p.lastComments.map(c => c.id)
                    }
                    return copy
                }))
            }
        }
        case "FETCH_POST_COMMENTS_SUCCESS": {
            return {
                ...state, byId: {
                    ...state.byId,
                    [action.payload.postId]: {
                        ...state.byId[action.payload.postId],
                        commentsIds: action.payload.comments.map(c => c.id)
                    }
                }
            }
        }
        case "UPDATE_POST_SUCCESS": {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.postId]: {...state.byId[action.payload.postId], text: action.payload.text}
                },
            }
        }
        case "DELETE_COMMENT_SUCCESS": {
            const post = state.byId[action.payload.postId];
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.postId]: {
                        ...post,
                        commentsIds: post.commentsIds.filter(id => id !== action.payload.commentId)
                    }
                }
            }
        }
    }
    return state
}

type PostReducerActionsType =
    | ReturnType<typeof fetchPostSuccess>
    | ReturnType<typeof updatePostSuccess>
    | ReturnType<typeof fetchPostCommentsSuccess>
    | ReturnType<typeof deleteCommentSuccess>


export const updatePostSuccess = (postId: number, text: string) => ({
    type: 'UPDATE_POST_SUCCESS',
    payload: {postId, text}
} as const)
export const fetchPostSuccess = (posts: PostApiType[]) => ({
    type: 'FETCH_POST_SUCCESS',
    payload: {posts}
} as const)


export const fetchPosts = () => async (dispatch: Dispatch) => {
    const posts = await api.getPosts()
    dispatch(fetchPostSuccess(posts))
}
export const updatePost = (postId: number, text: string) => async (dispatch: Dispatch) => {
    const result = await api.updatePost(postId, text)
    dispatch(updatePostSuccess(postId, text))
}
