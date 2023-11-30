import { useRef } from "react";
import { Form, Input, Modal, Radio, notification } from "antd";
import { createUser } from "../api/users";

const CreateUserModal = (data) => {
  const formRef = useRef();

  const onOk = () => {
    formRef?.current?.submit();
  };

  const onFinish = async (values) => {
    try {
      await createUser({
        ...values,
        planoId: values.plano,
      });
      await data?.onSucess();
      data.onCancel();
      notification.success({ message: "Usuário cadastrada com sucesso!" });
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
      title="Criar usuário"
      cancelText="Cancelar"
      okText="Criar usuário"
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        autoComplete="off"
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
          <Input />
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

export default CreateUserModal;
