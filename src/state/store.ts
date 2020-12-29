import {applyMiddleware, combineReducers, createStore} from "redux";
import {postReducer} from "../features/posts/bll/reducer";
import thunk from "redux-thunk";

const rootReducers = combineReducers({
    posts: postReducer
});

export type AppStateType = ReturnType<typeof rootReducers>

export const store = createStore(rootReducers, applyMiddleware(thunk))


