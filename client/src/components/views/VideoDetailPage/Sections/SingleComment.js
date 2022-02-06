import React, { useState } from 'react';
import { Comment, Avatar, Button, Input, message } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

function SingleComment(props) {

    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState('');

    const replyToggle = () => {
        setOpenReply(!OpenReply);
    };

    const handleComment = (event) => {
        setCommentValue(event.currentTarget.value);
        console.log(props);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const payload = {
            content: CommentValue,
            responseTo: props.comment._id,
            writer: props.writer,
            postId: props.comment.postId,
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

    const actions = [
        <span onClick={replyToggle} key='comment-basic-reply-to'> Reply to {props.comment.writer.name}</span>
    ];

    return (
        <div>
            <Comment 
                avatar={<Avatar />}
                actions={actions}
                author={props.comment.writer.name}
                content={props.comment.content}
            />

            {OpenReply && 
                <form
                    style={{ display: 'flex' }}
                    onSubmit={onSubmit}
                >
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        placeholder="Enter your comment"
                        onChange={handleComment}
                    />
                    <br />
                    <button 
                        style={{ width: '20%', height: '52px' }}
                        onSubmit={onSubmit}
                    >
                        Submit
                    </button>
                </form>
            }
        </div>
    );
}

export default SingleComment;