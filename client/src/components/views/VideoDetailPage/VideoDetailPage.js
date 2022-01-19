import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, List, Avatar, message } from 'antd';
import axios from 'axios';

function VideoDetailPage() {
    const { videoId } = useParams();
    const variable = { videoId: videoId };
    const [VideoDetail, setVideoDetail] = useState([]);

    useEffect(() => {
        axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success) {
                    setVideoDetail(response.data.videoDetail);
                } else {
                    message.error('Fails to load a video');
                }
            })
    }, []);

    return (
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>
                <div style={{ width: '100%', padding: '3rem 4rem' }}>
                    <video style={{ width: '100%' }} src={VideoDetail.filePath ? `http://localhost:5000/${VideoDetail.filePath}` : ''} controls />
                    <List.Item
                        actions
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={VideoDetail.writer?.image} />}
                            title={VideoDetail.writer?.name}
                            description={VideoDetail.description}
                        />
                    </List.Item>

                    {/* comments section */}
                </div>
            </Col>
            <Col lg={6} xs={24}>
                Side Bar
            </Col>
        </Row>
    );
}

export default VideoDetailPage;