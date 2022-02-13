import { Button, Checkbox, Form, Input, Modal } from "antd";
import React from "react";
import { useLogin } from "./LoginContext";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginUser } from "../../../../services/APIService";
interface IValue {
 username: string,
 password: string,
 remember: boolean
}
export default function Login() {
   const [form] = Form.useForm();
  const login = useLogin();
  React.useEffect(() => {
    if (login.visibleLogin) {
      form.setFieldsValue({ user: "antd" });
    }
  }, [form, login.visibleLogin]);
  const [confirmLoading1, setConfirmLoading1] = React.useState(false);
  const [validateStatus1, setValidateStatus1] = React.useState(true);
  if (!login.visibleLogin) return null
  const handleCancel1 = () => {
    login.toggleLogin()
    toSuccess()
  };
  
  const handleOk1 = () => {
    setConfirmLoading1(true);
    setTimeout(() => {
      login.toggleLogin()
      setConfirmLoading1(false);
    }, 2000);
  };
  const toErr = () => {
    setValidateStatus1(false)
  }
  const toSuccess = () => {
    setValidateStatus1(true)
  }
  const onFinish = (values: IValue) => {
    const email = values.username;
    const password = values.password;
    const toCreate = { email, password }
   
    console.log(toCreate)
    loginUser(toCreate).then(() => {
      console.log('Received values of form: ', values);
      login.toggleLogin()
    }).catch(() => toErr());

   
  };
  

  if (validateStatus1) {
    return (
      <Modal
        title="Вход"
        visible={login.visibleLogin}
        onOk={handleOk1}
        confirmLoading={confirmLoading1}
        onCancel={handleCancel1}
        footer={[]}>       
     
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
           
            help={null}
            name="username"
            rules={[{ required: true, message: 'Пожалуйста, введите электронную почту' }]}
            
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Электронная почта" onChange={toSuccess} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Пароль"
              onChange={toSuccess}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>

       
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Войти
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </Modal>
    )
  } else {
    return (
     <Modal
        title="Вход"
        visible={ login.visibleLogin}
        onOk={handleOk1}
        confirmLoading={confirmLoading1}
        onCancel={handleCancel1}
        footer={[]}
      >
       
     
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
        <Form.Item
          validateStatus='error'
      help="Неверный адрес электронной почты или пароль"
        name="username"
        rules={[{ required: true, message: 'Пожалуйста, введите логин' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Электронная почта" onChange={toSuccess}/>
      </Form.Item>
        <Form.Item
           validateStatus='error'
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
            placeholder="Пароль"
            onChange={toSuccess}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

       
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Войти
        </Button>
        {/* Or <a href="">register now!</a> */}
      </Form.Item>
      </Form>
    </Modal>
 )
}

  
}