import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginUser } from './../../../../services/APIService';
interface IValue {
  username: string;
  password: string;
  remember: boolean;
}

const Login = (props: any) => {
  const onFinish = (values: IValue) => {
    const email = values.username;
    const password = values.password;
    const toCreate = { email, password };

    console.log(toCreate);
    loginUser(toCreate).then(props.onLogin);
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name='username'
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Username'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Log in
        </Button>
        {/* Or <a href="">register now!</a> */}
      </Form.Item>
    </Form>
  );
};

export default Login;
