import { Button, Form,  Modal } from "antd";
import React from "react";
import { useExit } from "./ExitContext";

export default function Exit() {

  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Ты действительно хочешь выйти?');

   const [form] = Form.useForm();
  const exit = useExit();
  React.useEffect(() => {
    if (exit.visibleExit) {
      form.setFieldsValue({ user: "antd" });    }
  }, [form, exit.visibleExit]);
 
  
  if (!exit.visibleExit) return null
  const handleCancel = () => {
    exit.toggleExit() 
  };
  
 const handleOk = () => {
   setModalText('Выполняется выход...');
    setConfirmLoading(true);
   setTimeout(() => {
     localStorage.removeItem('token')
     localStorage.removeItem('userId')
      exit.toggleExit()
     setConfirmLoading(false);
     setModalText('Ты действительно хочешь выйти?');
    }, 2000);
  };
    return (
      <Modal
        className="modal-exit"
        title="Выход"
        visible={exit.visibleExit}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
         footer={[
            <Button key="back" type="primary"  onClick={handleCancel}>
              Отмена
            </Button>,
            <Button key="submit" type="primary" className="exit-btn" onClick={handleOk}>
              Да
            </Button>
          ]}
      >
        <p>{ modalText}</p>
        </Modal>
 )
}

  
