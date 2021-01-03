import React, {ChangeEvent, useState} from 'react';
import {PostType} from "../../../api/api";
import {useDispatch} from "react-redux";
import {updatePosts} from "../bll/reducer";


export const Post: React.FC<{ post: PostType }> = ({post}) => {

    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(post.text)
    const dispatch = useDispatch()

   const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
       setText(e.currentTarget.value)
   }
   const onBlurHandle = () => {
       dispatch(updatePosts(post.id, text))
       setEditMode(false)
   }

    return (
        <div>
            <b>{post.author.name}</b>
            <br/>
            {!editMode
                ? <span onDoubleClick={() => setEditMode(true)}>{post.text}</span>
                : <textarea
                    onChange={changeText}
                    onBlur={onBlurHandle}
                >{text}</textarea>}
                <br/>
                Likes: {post.likes}
            <hr/>
        </div>
    );
}

