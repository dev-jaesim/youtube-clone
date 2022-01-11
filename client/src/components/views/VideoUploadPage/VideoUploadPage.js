import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { Typography, Button, Form, message, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
];

const CategoryOptions = [
    { value: 0, label: 'Film & Animation' },
    { value: 1, label: 'Racing' },
    { value: 2, label: 'Music' },
    { value: 3, label: 'Animals' }
];

function VideoUploadPage() {
    const userState = useSelector(state => state.user);
    const navigate = useNavigate();

    const [VideoTitle, setVideoTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState('Film & Animation');
    const [FilePath, setFilePath] = useState('');
    const [Duration, setDuration] = useState('');
    const [ThumbnailPath, setThumbnailPath] = useState('');

    // useEffect(() => {
    //     if(userState.userData === undefined || !userState.userData.isAuth) {
    //         navigate('/login');        
    //     }
    // });

    const onTitleChange = e => {
        setVideoTitle(e.currentTarget.value);
    };

    const onDescriptionChange = e => {
        setDescription(e.currentTarget.value);
    };

    const onPrivateChange = e => {
        setPrivate(e.currentTarget.value);
    };

    const onCategoryChange = e => {
        setCategory(e.currentTarget.value);
    }

    const onDrop = (files) => {
        const formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        };
        formData.append("file", files[0]);

        axios.post('/api/video/upload', formData, config)
            .then(response => {
                if (response.data.success) {
                    const variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    };

                    setFilePath(response.data.filePath);

                    axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                setDuration(response.data.fileDuration);
                                setThumbnailPath(response.data.thumbsFilePath);
                            } else {
                                alert('Failed to make thumbnails');
                            }
                        });
                } else {
                    alert('failed to save the video in server');
                }
            });
    };

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form wrapperCol={{ span: 16 }} style={{ margin: 'auto'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Drop zone */}
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={10000000000}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <PlusOutlined />
                            </div>
                        )}
                    </Dropzone>

                    {/* Thumbnail */}
                    {ThumbnailPath && 
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt='thumbnail' />
                        </div>
                    }
                </div>
                <br /><br />
                <label>Title</label>
                <Input 
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br /><br />
                <select onChange={onPrivateChange} value={Private}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}> {item.label} </option>
                    ))}
                </select>
                <br /><br />
                <select onChange={onCategoryChange} value={Category}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}> {item.label} </option>
                    ))}
                </select>
                <br /><br />
                <Button type='primary' size='large'>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default VideoUploadPage;