import React from 'react';
import './App.css';
import {PostPage} from "./pages/PostPage";
import {Provider} from "react-redux";

const App: React.FC<{store: any}> = (props) => {
    return (
        <Provider store={props.store}>
            <div className="App">
                <PostPage/>
            </div>
        </Provider>
    );
}

export default App;
