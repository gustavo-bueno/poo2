import { useRef } from "react";
import { Form, Input, InputNumber, Modal, notification } from "antd";
import { createPlan } from "../api/plans";

const CreatePlanModal = (data) => {
  const formRef = useRef();

  const onOk = () => {
    formRef?.current?.submit();
  };

  const onFinish = async (values) => {
    try {
      await createPlan(values);
      await data?.onSuccess();
      data.onCancel();
      notification.success({ message: "Plano cadastrado com sucesso!" });
    } catch {
      notification.error({
        message:
          "Aconteceu um erro. Por favor verfique a informação, e tente novamente mais tarde.",
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
      title="Criar plano"
      cancelText="Cancelar"
      okText="Criar plano"
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
        autoComplete="off"
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[
            {
              required: true,
              message: "Por favor, digite um id para o plano",
            },
          ]}
        >
          <InputNumber precision={0} defaultValue={data.initialId} />
        </Form.Item>

        <Form.Item
          label="Descrição do plano"
          name="descricao"
          rules={[
            {
              required: true,
              message: "Por favor digite um nome para o plano!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Preço"
          name="preco"
          rules={[{ required: true, message: "Por favor, digite um preço!" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Quant. de conexões"
          name="qtd_conexoes"
          rules={[
            {
              required: true,
              message: "Por favor, digite um quant. de conexões para o plano",
            },
          ]}
        >
          <InputNumber precision={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePlanModal;
