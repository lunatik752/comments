import {api, AuthorApiType, PostApiType} from "../../../api/api";
import {Dispatch} from "redux";
import {fetchPostSuccess, mapToLookupTable} from "./posts-reducer";



const initialState = {
    // items: [] as PostType[],
    // allIds: [] as number[],
    byId: {} as {[key: string]: AuthorApiType}
}

type StateType = typeof initialState

export const authorReducer = (state = initialState, action: PostReducerActionsType): StateType => {
    switch (action.type) {
        case "FETCH_POST_SUCCESS": {
            return {
                ...state,
                // allIds: action.payload.posts.map(p => p.author.id),
                byId: mapToLookupTable(action.payload.posts.map(p => p.author))
            }
        }
        /*case "UPDATE_POST_SUCCESS": {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.postId]: {...state.byId[action.payload.postId], text: action.payload.text}
                },
                // items: state.items.map(i => i.id === action.payload.postId ? {...i, text: action.payload.text} : i)
            }
        }*/
    }
    return state
}

type PostReducerActionsType = ReturnType<typeof fetchPostSuccess>

