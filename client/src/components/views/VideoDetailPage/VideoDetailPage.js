import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Row, Col, List, Avatar, message } from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VideoDetailPage() {
    const userState = useSelector(state => state.user);
    const { videoId } = useParams();
    const [VideoDetail, setVideoDetail] = useState([]);
    const [CommentList, setCommentList] = useState([]);

    useEffect(() => {
        axios.post('/api/video/getVideoDetail', { videoId: videoId })
            .then(response => {
                if(response.data.success) {
                    setVideoDetail(response.data.videoDetail);
                } else {
                    message.error('Fails to load a video');
                }
            });
        
        axios.post('/api/comment/getComments', { videoId: videoId })
            .then(response => {
                if(response.data.success) {
                    setCommentList(response.data.comments);
                } else {
                    message.error('Fails to load comments');
                }
            })
    }, [videoId]);

    const refreshFunction = (newComment) => {
        setCommentList(CommentList.concat(newComment));
    };

    const subscriptionButton = userState.userData?.isAuth && userState.userData?._id !== VideoDetail.writer?._id && <Subscribe userTo={VideoDetail.writer?._id} userFrom={userState.userData?._id} />

    return (
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>
                <div style={{ width: '100%', padding: '3rem 4rem' }}>
                    <video style={{ width: '100%' }} src={VideoDetail.filePath ? `http://localhost:5000/${VideoDetail.filePath}` : ''} controls />
                    <List.Item
                        actions={[subscriptionButton]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={VideoDetail.writer?.image} />}
                            title={VideoDetail.writer?.name}
                            description={VideoDetail.description}
                        />
                    </List.Item>

                    {/* comments section */}
                    {/* <Comment userTo={VideoDetail.writer?._id} userFrom={userState.userData?._id ?? null} videoId={videoId} /> */}
                    <Comment 
                            refreshFunction={refreshFunction} 
                            commentData={{ responseTo: VideoDetail.writer?._id,
                                            writer: userState.userData?._id ?? null,
                                            postId: videoId,
                                            commentList: CommentList
                                        }} 
                    />
                </div>
            </Col>
            <Col lg={6} xs={24}>
                <SideVideo />
            </Col>
        </Row>
    );
}

export default VideoDetailPage;