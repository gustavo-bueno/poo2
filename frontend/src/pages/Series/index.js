import { useEffect, useState } from "react";
import { Button, Modal, Space, Table, notification } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { getGenres } from "../../api/genres";
import { deleteSerie, getSeries } from "../../api/series";
import CreateSerieModal from "../../components/CreateSerieModal";
import EditSerieModal from "../../components/EditSerieModal";

const { confirm } = Modal;

export const Series = () => {
  const [genres, setGenres] = useState([]);
  const [series, setSeries] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [serieToEdit, setSerieToEdit] = useState({});

  const loadSeries = async () => {
    try {
      const data = await getSeries();
      setSeries(data);
    } catch {
      notification.error({ message: "Houve um erro ao carregar as series" });
    }
  };

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch {
        notification.error({ message: "Não foi possível carregar os gêneros" });
      }
    };

    loadSeries();
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
      title: "Gênero",
      dataIndex: "genero",
      key: "genero",
    },
    {
      title: "Sinopse",
      dataIndex: "sinopse",
      key: "sinopse",
    },
    {
      title: "Quantidade de episódios",
      dataIndex: "qtd_episodios",
      key: "qtd_episodios",
    },
    {
      title: "Avalicação",
      dataIndex: "avaliacao",
      key: "avaliacao",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setSerieToEdit(record);
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
                content: `A série ${record.nome} será excluída`,
                onOk: async () => {
                  await deleteSerie(record.id);
                  await loadSeries();
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
      <h2>Séries</h2>
      <Table columns={columns} dataSource={series} />
      <Button onClick={() => setOpenCreateModal(true)}>Criar série</Button>
      <CreateSerieModal
        open={openCreateModal}
        initialId={series[series.length - 1]?.id + 1}
        onCancel={() => setOpenCreateModal(false)}
        onSuccess={loadSeries}
        genres={genres}
      />
      <EditSerieModal
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        onSuccess={loadSeries}
        genres={genres}
        initialValues={serieToEdit}
      />
    </section>
  );
};
