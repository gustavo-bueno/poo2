import { useRef } from "react";
import { Form, Input, Modal, Radio, notification } from "antd";
import { updateUser } from "../api/users";

const EditUserModal = (data) => {
  const formRef = useRef();

  const onOk = () => {
    formRef?.current?.submit();
  };

  const onFinish = async (values) => {
    try {
      await updateUser({ ...values, planoId: values.plano });
      notification.success({ message: "Usuário editada com sucesso!" });
      await data?.onSucess();
      data.onCancel();
    } catch {
      notification.error({
        message: "Aconteceu um erro. Por favor tente novamente mais tarde.",
      });
    }
  };

  const onFinishFailed = () => {
    notification.error({
      message: "Aconteceu um erro. Verifique as informações digitadas.",
    });
  };

  return (
    <Modal
      {...data}
      title="Editar usuário"
      cancelText="Cancelar"
      okText="Editar usuário"
      width={600}
      centered
      onOk={onOk}
      bodyStyle={{
        padding: 16,
      }}
    >
      <Form
        ref={formRef}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={data.initialValues}
      >
        <Form.Item
          label="Nome"
          name="nome"
          rules={[{ required: true, message: "Por favor digite um nome!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Plano" name="plano">
          <Radio.Group>
            {data?.plans?.map((plan) => (
              <Radio key={plan.id} value={plan.id}>
                {plan.descricao}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Digite um e-mail!" },
            { type: "email", message: "Insira um e-mail válido" },
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="senha"
          rules={[{ required: true, message: "A senha é obrigatória!" }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
