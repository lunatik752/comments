import {applyMiddleware, combineReducers, createStore} from "redux";
import {postReducer} from "../features/posts/bll/posts-reducer";
import thunk from "redux-thunk";
import {authorReducer} from "../features/posts/bll/authors-reducer";
import {commentsReducer} from "../features/posts/bll/comments-reducer";

const rootReducers = combineReducers({
    posts: postReducer,
    authors: authorReducer,
    comments: commentsReducer
});

export type AppStateType = ReturnType<typeof rootReducers>

export const store = createStore(rootReducers, applyMiddleware(thunk))


