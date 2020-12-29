import {api, PostType} from "../../../api/api";
import {Dispatch} from "redux";

const initialState = {
    items: [] as PostType[]
}

export const postReducer = (state = initialState, action: PostReducerActionsType) => {
    switch (action.type) {
        case "FETCH_POST_SUCCESS": {
            return {
                ...state, items: action.payload.posts
            }
        }
    }
    return state
}

type PostReducerActionsType = ReturnType<typeof fetchPostSuccess>

export const fetchPostSuccess = (posts: PostType[]) => ({
    type: 'FETCH_POST_SUCCESS',
    payload: {posts}
 } as const)


export const fetchPosts = () => async (dispatch: Dispatch) => {
    const posts = await api.getPosts()
    dispatch(fetchPostSuccess(posts))
}
