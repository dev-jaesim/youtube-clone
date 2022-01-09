import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Typography,
  message,
} from 'antd';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

const { Title } = Typography;

function RegisterPage() {
  message.config({
    top: 100,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const formData = {
      email: values.email,
      password: values.password,
      name: `${values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1)} ${values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1)}`,
      lastName: values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1)
    };

    dispatch(registerUser(formData)).then((response) => {
      if (response.payload.success) {
        navigate('/login', { replace: true });
      } else {
        message.error(response.payload.message);
      }
    });
  };

  return (
    <Row justify="center">
      <Col lg={10}>
        <div>
          <Title level={2}>SIGN UP</Title>
        </div>
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Please enter a valid email!",
              },
              {
                required: true,
                message: "Please enter an email!",
              },
            ]}
          >
            <Input type="email" placeholder="email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter a password",
              },
              { min: 7, message: "Password must be minimum 7 characters." },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm the password" />
          </Form.Item>

          <Row gutter={12}>
            <Col className="gutter-row" lg={12}>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <Input placeholder="first name" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" lg={12}>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
              >
                <Input placeholder="last name" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default RegisterPage;
