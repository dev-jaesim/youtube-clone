import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { message } from 'antd';


function SideVideo() {
    const [SideVideos, setSideVideos] = useState([]);

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if(response.data.success) {
                    setSideVideos(response.data.videos);
                } else {
                    message.error('Fails to load videos.');
                }
            })        
    }, []);

    const renderSideVideo = SideVideos.map((video, index) => {
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration - minutes * 60);

        return (
            <div key={index} style={{ display: 'flex', marginBottom: '1rem', padding: '0 2rem' }}>
                <div style={{ width: '40%', marginRight: '1rem' }}>
                    <a href={`/video/${video._id}`}>
                        <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt='thumbnail' />
                    </a>
                </div>
                <div style={{ width: '50%' }}>
                    <a href='#'>
                        <span style={{ fontSize: '1rem', color: 'black' }}> {video.title} </span> <br />
                        <span> {video.writer.name} </span> <br />
                        <span> {video.views} Views </span> <br />
                        <span> {minutes}: {seconds} </span>
                    </a>
                </div>
            </div>
        );
    });

    return (
        <>
            <div style={{ marginTop: '3rem' }} />
            {renderSideVideo}
        </>
    );
}

export default SideVideo;