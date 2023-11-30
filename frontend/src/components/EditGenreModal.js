import { useRef } from "react";
import { Form, Input, InputNumber, Modal, notification } from "antd";
import { updateGenre } from "../api/genres";

const EditGenreModal = (data) => {
  const formRef = useRef();

  const onOk = () => {
    formRef?.current?.submit();
  };

  const onFinish = async (values) => {
    try {
      await updateGenre(values);
      await data?.onSuccess();
      data.onCancel();
      notification.success({ message: "Gênero editado com sucesso!" });
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
      title="Editar gênero"
      cancelText="Cancelar"
      okText="Editar gênero"
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
        initialValues={data.initialValues}
        autoComplete="off"
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[
            {
              required: true,
              message: "Por favor, digite um id para o gênero",
            },
          ]}
        >
          <InputNumber disabled precision={0} />
        </Form.Item>

        <Form.Item
          label="Nome do gênero"
          name="nome"
          rules={[
            {
              required: true,
              message: "Por favor digite um nome para o gênero!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Descrição"
          name="descricao"
          rules={[
            { required: true, message: "Por favor, digite uma descrição!" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditGenreModal;
