import React, { useEffect } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
    useEffect(() => {
        console.log(props);
    }, []);

    const renderReplyComment = () => {
        props.commentList.map((comment, index) => {
            <React.Fragment>
                {
                    comment.responseTo === props.parentCommentId &&
                    <div>
                        <SingleComment refreshFunction={props.refreshFunction} writer= {props.commentData.writer} comment={comment} key={index} />
                        <ReplyComment commentList={props.commentList} key={`${index}-reply`} />
                    </div>
                }
            </React.Fragment>
        });
    };

    return (
        <div>
            ReplyComment
        </div>
    );
}

export default ReplyComment;