import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../state/store";

export const Comment: React.FC<{ id: number }> = ({id}) => {
    const comment = useSelector((state: AppStateType) => state.comments.byId[id])
    const author = useSelector((state: AppStateType) => state.authors.byId[comment.authorId])
    return (
        <li>
            <b>{author.name}</b>
            {comment.text}
        </li>
    )
}
