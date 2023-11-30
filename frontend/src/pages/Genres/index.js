import { useEffect, useState } from "react";
import { Button, Modal, Space, Table, notification } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { deleteGenre, getGenres } from "../../api/genres";
import EditGenreModal from "../../components/EditGenreModal";
import CreateGenreModal from "../../components/CreateGenreModal";

const { confirm } = Modal;

export const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [genreToEdit, setGenreToEdit] = useState({});

  const loadGenres = async () => {
    try {
      const data = await getGenres();
      setGenres(data);
    } catch {
      notification.error({ message: "Não foi possível carregar os gêneros" });
    }
  };

  useEffect(() => {
    loadGenres();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setGenreToEdit(record);
              setOpenEditModal(true);
            }}
            type="text"
          >
            Editar
          </Button>
          <Button
            danger
            type="text"
            onClick={() => {
              confirm({
                centered: true,
                title: "Ter certeza que quer excluir esse item",
                icon: <ExclamationCircleFilled />,
                content: `O gênero ${record.nome} será excluído`,
                onOk: async () => {
                  await deleteGenre(record.id);
                  await loadGenres();
                },
              });
            }}
          >
            Excluir
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <section>
      <h2>Gêneros</h2>
      <Table columns={columns} dataSource={genres} />
      <Button onClick={() => setOpenCreateModal(true)}>Criar gênero</Button>
      <CreateGenreModal
        initialId={genres[genres.length - 1]?.id + 1}
        open={openCreateModal}
        onCancel={() => setOpenCreateModal(false)}
        onSuccess={loadGenres}
      />
      <EditGenreModal
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        onSuccess={loadGenres}
        initialValues={genreToEdit}
      />
    </section>
  );
};
