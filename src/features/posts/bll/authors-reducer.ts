import {api, AuthorApiType} from "../../../api/api";
import {fetchPostSuccess, mapToLookupTable} from "./posts-reducer";
import {Dispatch} from "redux";
import {fetchPostCommentsSuccess} from "./comments-reducer";


const initialState = {
    byId: {} as { [key: string]: AuthorApiType }
}

type StateType = typeof initialState

export const authorReducer = (state = initialState, action: ActionsTypes): StateType => {
    switch (action.type) {
        case "FETCH_POST_SUCCESS": {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...mapToLookupTable(action.payload.posts.map(p => p.author)),
                    ...mapToLookupTable(action.payload.posts.map(p => p.lastComments).flat().map(c => c.author))
                }
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
        case "FETCH_POST_COMMENTS_SUCCESS": {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...mapToLookupTable(action.payload.comments.map(c => c.author))
                }
            }
        }
    }
    return state
}


type ActionsTypes = ReturnType<typeof fetchPostSuccess>
    | ReturnType<typeof fetchPostCommentsSuccess>
    | ReturnType<typeof updateAuthorSuccess>

export const updateAuthorSuccess = (authorID: number, authorName: string) => ({
    type: 'UPDATE_AUTHOR_SUCCESS',
    payload: {authorID, authorName}
} as const)

export const updateAuthor = (authorId: number, authorName: string) => async (dispatch: Dispatch) => {
    const result = await api.updateAuthor(authorId, authorName)
    dispatch(updateAuthorSuccess(authorId, authorName))
}
