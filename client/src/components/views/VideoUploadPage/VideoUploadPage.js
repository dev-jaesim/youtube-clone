import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
const { Title } = Typography;
const { TextArea } = Input;

function VideoUploadPage() {
    const userState = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if(userState.userData === undefined || !userState.userData.isAuth) {
            navigate('/login');        
        }
    });

    return (
        <div>
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form wrapperCol={{ span: 16 }} style={{ margin: 'auto', width: '50%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Drop zone */}
                    <Dropzone
                        onDrop
                        multiple
                        maxSize
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                {/* <Icon type="plus" style={{ fontSize: '3rem' }} /> */}
                                +
                            </div>
                        )}
                    </Dropzone>

                    {/* Thumbnail */}
                    <div>
                        <img />
                    </div>
                </div>
                <br />
                <br />
                <label>Title</label>
                <Input />
                <br />
                <br />
                <label>Description</label>
                <TextArea />
                <br />
                <br />
                <select>
                    <option></option>
                </select>

                <select>
                    <option></option>
                </select>
                <br />
                <br />
                <Button type='primary' size='large'>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default VideoUploadPage;