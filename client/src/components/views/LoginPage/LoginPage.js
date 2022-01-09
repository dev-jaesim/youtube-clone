import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useDispatch } from 'react-redux';

function LoginPage() {
  message.config({
    top: 100,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToRegisterPage = () => {
    navigate('/register', { replace: true });
  }
  
  const onFinish = (values) => {
    const formData = {
      email: values.email,
      password: values.password
    };
    
    dispatch(loginUser(formData))
      .then(response => {
        if (response.payload.loginSuccess) {
          navigate('/', { replace: true });
        } else {
          message.error(response.payload.message);
        }
      });
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
          {
            type: "email",
            message: "The input is not valid email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button onClick={goToRegisterPage} style={{marginLeft: '1rem'}}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;