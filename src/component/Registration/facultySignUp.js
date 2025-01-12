import React from 'react';
import 'antd/dist/antd.css';
import '../../styles/Register.css'
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import { Button } from "antd";
import { Link } from 'react-router-dom';

export default function facultySignUp(props) {

    function handleLogin(values) {
        props.createTeacher(values);
    }
    return (
        <div className="formfs">
            <Form
                name="login-form"
                initialValues={{ remember: true }}
                onFinish={handleLogin}
            >
                <p className="form-title">Welcome To "The Mentor"</p>
                <p>Sign Up </p>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input
                        placeholder="Name"
                    />
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your enrollment number!' }]}
                >
                    <Input
                        placeholder="Staff Id"
                    />
                </Form.Item>
                
                <Form.Item
                    name="email"
                    rules={[{ required: true,type: "email", message: 'Please input valid email!' }]}
                >
                    <Input
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                    <Link to="/login">
                        <span>Already have an account </span>
                    </Link>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        SIGNIN
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}