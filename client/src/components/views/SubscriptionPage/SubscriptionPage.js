import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Typography, Row, Col, Avatar, Card, message } from 'antd';
import moment from 'moment';
import axios from 'axios';

const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {
    const userState = useSelector(state => state.user);
    const [Video, setVideo] = useState([]);

    useEffect(() => {
        axios.post('/api/video/getSubscriptionVideos', { userFrom: userState.userData?._id })
            .then(response => {
                if(response.data.success) {
                    setVideo(response.data.videos);
                } else {
                    message.error('Fails to load videos.');
                }
            })
    }, []);

    const renderCards = Video.map((video, index) => {
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration - minutes * 60);

        return (
            <Col key={index} lg={6} md={8} xs={24}>
                <Link to={`/video/${video._id}`}>
                    <div style={{ position: 'relative' }}>
                        <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt='thumbnail' />
                        <div className='duration'>
                            <span>{minutes} : {seconds}</span>
                        </div>
                    </div>
                </Link>
                <br />
                <Meta
                    avatar={
                        <Avatar src={video.writer.image} />
                    }
                    title={video.title}
                    description=''
                />
                <span> {video.writer.name} </span>
                <br />
                <span style={{ marginLeft: '3rem' }} >
                    {video.views} views
                </span>
                -
                <span>
                    {moment(video.createdAt).format('MMM Do YYYY')}
                </span>
            </Col>
        );
    });

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}> Recommended </Title>
            <hr />
            <Row gutter={[32, 16]}>
                {!Video.length ? (
                    <div> No Videos</div>
                ) : renderCards}
            </Row>
        </div>
    );
}

export default SubscriptionPage;