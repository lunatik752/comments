import {applyMiddleware, combineReducers, createStore} from "redux";
import {postReducer} from "../features/posts/bll/posts-reducer";
import thunk from "redux-thunk";
import {authorReducer} from "../features/posts/bll/authors-reducer";

const rootReducers = combineReducers({
    posts: postReducer,
    authors: authorReducer
});

export type AppStateType = ReturnType<typeof rootReducers>

export const store = createStore(rootReducers, applyMiddleware(thunk))


