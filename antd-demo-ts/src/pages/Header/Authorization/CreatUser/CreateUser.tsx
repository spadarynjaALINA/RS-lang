import React, { useState } from 'react';
import {Form,Input,Button, Modal} from 'antd';
import { loginUser,createUser } from '../../../../services/APIService';
import { useCreateUser } from './CreateUserContext';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


const RegistrationForm = () => {
   
  const create = useCreateUser()
  const [form] = Form.useForm();
  React.useEffect(() => {
    if (create.visibleCreateUser) {
      form.setFieldsValue({ user: "antd" });
    }
  }, [form, create.visibleCreateUser]);
  const [confirmLoading2, setConfirmLoading2] = React.useState(false); 
    const handleCancel2 = () => {
    console.log('Clicked cancel button');
    create.toggleCreateUser();
  };
    const handleOk2 = () => {    
    setConfirmLoading2(true);
    setTimeout(() => {
    create.toggleCreateUser();
      setConfirmLoading2(false);
      
    }, 2000);
  };
  
  
if(!create.visibleCreateUser)return null
 const onFinish = (values: any) => {
  const email = values.email;
  const password = values.password;
  const toCreate={email, password} 
  createUser(toCreate).then(() => loginUser(toCreate))
   console.log('Received values of form: ', values);
   create.toggleCreateUser();
  };

 
  
      
 
  return (
     <Modal
        title="Регистрация"
        visible={create.visibleCreateUser}
        onOk={handleOk2}
        confirmLoading={confirmLoading2}
      onCancel={handleCancel2}
      footer ={[]}
      >
      
     
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
     
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="Электронная почта"
        rules={[
          {
            type: 'email',
            message: 'Неверный формат адреса электронной почты!',
          },
          {
            required: true,
            message: 'Пожалуйста, введи адрес электронной почты!',
          },
        ]}
      >
        <Input />
      </Form.Item>

        <Form.Item
           
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введи  пароль!',
          },
           ({ getFieldValue }) => ({
            validator(_, value) {
              if ( value.length> 7) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Длина пароля не менее 8 символов'));
            },
          }),
        ]}
          hasFeedback
          
        >
          
          <Input.Password  />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Подтверди пароль"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введи  пароль!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="nickname"
        label="Никнейм"
        tooltip="Как ты хочешь, чтобы тебя называли?"
        rules={[{ required: true, message: 'Пожалуйста, введи свой никнейм!', whitespace: true }]}
      >
        <Input />
      </Form.Item>   
      
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
         Регистрация   
        </Button>
      </Form.Item>
    </Form>
  </Modal> );
};

export default RegistrationForm