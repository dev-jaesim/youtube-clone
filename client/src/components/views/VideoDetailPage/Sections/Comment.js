import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReplyComment from './ReplyComment';
import SingleComment from './SingleComment';

function Comment(props) {
    const [CommentValue, setCommentValue] = useState('');

    const handleType = (event) => {
        setCommentValue(event.currentTarget.value)
        console.log(props);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        
        const payload = {
            content: CommentValue,
            writer: props.commentData.writer,
            postId: props.commentData.postId,
        };

        axios.post('/api/comment/saveComment', payload)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.result);
                    props.refreshFunction(response.data.result);
                } else {
                    message.error('An internal error occured');
                }
            });
        
        setCommentValue('');
    };

    return (
        <div>
            <br />
            <p> Replies </p>
            <hr />

            {/* Comment List */}

            {props.commentData.commentList && props.commentData.commentList.map((comment, index) => (
                (!comment.responseTo && 
                    <React.Fragment>
                        <SingleComment refreshFunction={props.refreshFunction} writer= {props.commentData.writer} comment={comment} key={index} />
                        <ReplyComment commentList={props.commentData.commentList} parentCommentId={comment._id} key={`${index}-reply`} />
                    </React.Fragment>
                )
            ))}

            {/* Root Comment Form */}

            <form
                style={{ display: 'flex' }}
                onSubmit={onSubmit}
            >
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    placeholder="Enter your comment"
                    onChange={handleType}
                    value={CommentValue}
                />
                <br />
                <button 
                    style={{ width: '20%', height: '52px' }}
                    onClick={onSubmit}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Comment;