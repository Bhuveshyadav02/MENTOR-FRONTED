import React from 'react';
import 'antd/dist/antd.css';
import '../../styles/Register.css'
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import {Button, Select, DatePicker } from "antd";
import { Link } from 'react-router-dom';


export default function StudentSignUp(props) {
    function handleLogin(values) {
        props.createStudent(values);
    }

    return (
        <div className="formss">
            <Form
                name="login-form"
                initialValues={{ remember: true }}
                onFinish={handleLogin}
            >
                <p className="form-title">Welcome To "The Mentor"</p>
                <p>SignUp</p>
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
                        placeholder="Enrollment Number"
                    />
                </Form.Item>
                <div>
                {/* <Form.Item label="Branch">
                <Select showSearch>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>

                </Select>
                </Form.Item>
                <Form.Item label="Degree">
                <Select  showSearch>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="1demo">ADemo</Select.Option>
                    <Select.Option value="demo">BDemo</Select.Option>
                    <Select.Option value="demo">CDemo</Select.Option>
                    <Select.Option value="demo">EDemo</Select.Option>
                    <Select.Option value="demo">FDemo</Select.Option>
                    <Select.Option value="demo">GDemo</Select.Option>
                    <Select.Option value="demo">FDemo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>

                </Select>
                </Form.Item>*/}
                </div>
                <Form.Item 
                    name="degree"
                    rules={[{ required: true, message: 'Please input degree!' }]}
                >
                    <Input
                        placeholder="Degree"
                    />
                </Form.Item>
                <Form.Item  label="Admission Date" name="admissionDate"
                rules={[{ required: true, message: 'Please input Admission Date!' }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item 
                    name="branch"
                    rules={[{ required: true, message: 'Please input branch!' }]}
                >
                    <Input
                        placeholder="Branch"
                    />
                </Form.Item>
                <Form.Item 
                    name="email"
                    rules={[{ required: true, type: "email", message: 'Please input valid email!' }]}
                >
                    <Input
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Please input Phone Number' }]}
                >
                    <Input
                        placeholder="Mobile number"
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
                <Form.Item>
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
