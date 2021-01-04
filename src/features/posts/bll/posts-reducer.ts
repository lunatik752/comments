import {api, PostApiType} from "../../../api/api";
import {Dispatch} from "redux";

export type PostType ={
    id: number
    text: string
    likes: number
    authorId: number
}

const initialState = {
    // items: [] as PostType[],
    allIds: [] as number[],
    byId: {} as {[key: string]: PostType}
}

type LookupTableType<T> = {
    [key: string]: T
}

export const mapToLookupTable = <T extends {id: number}>(items: T[]): LookupTableType<T> => {
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
                // items: action.payload.posts,
                allIds: action.payload.posts.map(p => p.id),
                byId: mapToLookupTable(action.payload.posts.map(p => {
                    const copy: PostType = {
                        id: p.id,
                        text: p.text,
                        likes: p.likes,
                        authorId: p.author.id
                    }

                    return copy
                }))


            }
        }
        case "UPDATE_POST_SUCCESS": {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.postId]: {...state.byId[action.payload.postId], text: action.payload.text}
                },
                // items: state.items.map(i => i.id === action.payload.postId ? {...i, text: action.payload.text} : i)
            }
        }
    }
    return state
}

type PostReducerActionsType =
    | ReturnType<typeof fetchPostSuccess>
    | ReturnType<typeof updatePostSuccess>

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
export const updatePosts = (postId: number, text: string) => async (dispatch: Dispatch) => {
    const result = await api.updatePost(postId, text)
    dispatch(updatePostSuccess(postId, text))
}