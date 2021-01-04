import {api, AuthorApiType} from "../../../api/api";
import {fetchPostSuccess, mapToLookupTable} from "./posts-reducer";
import {Dispatch} from "redux";


const initialState = {
    byId: {} as {[key: string]: AuthorApiType}
}

type StateType = typeof initialState

export const authorReducer = (state = initialState, action: PostReducerActionsType): StateType => {
    switch (action.type) {
        case "FETCH_POST_SUCCESS": {
            return {
                ...state,
                byId: mapToLookupTable(action.payload.posts.map(p => p.author))
            }
        }
        case "UPDATE_AUTHOR_SUCCESS": {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.authorID]: {...state.byId[action.payload.authorID], name: action.payload.authorName}
                },
            }
        }
    }
    return state
}

type PostReducerActionsType = ReturnType<typeof fetchPostSuccess> | ReturnType<typeof updateAuthorSuccess>

export const updateAuthorSuccess = (authorID: number, authorName: string) => ({
    type: 'UPDATE_AUTHOR_SUCCESS',
    payload: {authorID, authorName}
} as const)

export const updateAuthor = (authorId: number, authorName: string) => async (dispatch: Dispatch) => {
    const result = await api.updateAuthor(authorId, authorName)
    dispatch(updateAuthorSuccess(authorId, authorName))
}
