import
 React from 'react';
import 'antd/dist/antd.css';
import '../../styles/Register.css'
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import { Link } from 'react-router-dom';

export default function facultySignIn(props) {
    function handleLogin(values) {
        props.loginTeacher({username: values.username, password: values.password});
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="formf">
            <Form
                name="login-form"
                initialValues={{ remember: true }}
                onFinish={handleLogin}
                onFinishFailed={onFinishFailed}
            >
                
                <p className="form-title">Welcome back</p>
                <p>SignIn to the Mentor</p>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        placeholder="Username"
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
                
                {/* <Form.Item name="remember" valuePropName="checked">
                    <a href="/login">Forgot Password</a>
                </Form.Item> */}
                
                <Form.Item name="remember" valuePropName="checked">
                    <Link to="/signup">
                        <span>Don't have an account? </span>SIGN UP NOW
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