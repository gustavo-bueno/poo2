import { useRef } from "react";
import { Form, Input, InputNumber, Modal, Select, notification } from "antd";
import { updateMovie } from "../api/movies";

const EditMovieModal = (data) => {
  const formRef = useRef();

  const onOk = () => {
    formRef?.current?.submit();
  };

  const onFinish = async (values) => {
    try {
      await updateMovie(values);
      await data?.onSuccess();
      data.onCancel();
      notification.success({ message: "Filme editado com sucesso!" });
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
      title="Editar Filme"
      cancelText="Cancelar"
      okText="Editar Filme"
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
        initialValues={data.initialValues}
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[
            {
              required: true,
              message: "Por favor, digite um id para a filme",
            },
          ]}
        >
          <InputNumber disabled precision={0} />
        </Form.Item>

        <Form.Item
          label="Nome da Filme"
          name="nome"
          rules={[
            {
              required: true,
              message: "Por favor digite um nome para a filme!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Gênero" name="genero">
          <Select>
            {data?.genres?.map((genre) => (
              <Select.Option value={genre.id}>{genre.nome}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Sinopse"
          name="sinopse"
          rules={[
            { required: true, message: "Por favor, digite uma sinopse!" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Duração do filme (minutos)"
          name="duracao"
          rules={[
            {
              required: true,
              message: "Por favor, digite a duração do filme",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item label="Avalialição" name="avaliacao">
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditMovieModal;
