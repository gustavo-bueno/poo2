import { useEffect, useState } from "react";
import { Button, Modal, Space, Table, notification } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { getGenres } from "../../api/genres";
import { deleteMovie, getMovies } from "../../api/movies";
import CreateMovieModal from "../../components/CreateMovieModal";
import EditMovieModal from "../../components/EditMovieModal";

const { confirm } = Modal;

export const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState({});

  const loadMovies = async () => {
    try {
      const data = await getMovies();
      setMovies(data);
    } catch {
      notification.error({ message: "Houve um erro ao carregar os filmes" });
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

    loadMovies();
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
      title: "Duração (min)",
      dataIndex: "duracao",
      key: "duracao",
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
              setMovieToEdit(record);
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
                content: `O filme ${record.nome} será excluído`,
                onOk: async () => {
                  await deleteMovie(record.id);
                  await loadMovies();
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
      <h2>Filmes</h2>
      <Table columns={columns} dataSource={movies} />
      <Button onClick={() => setOpenCreateModal(true)}>Criar filme</Button>
      <CreateMovieModal
        initialId={movies[movies.length - 1]?.id + 1}
        open={openCreateModal}
        onCancel={() => setOpenCreateModal(false)}
        onSuccess={loadMovies}
        genres={genres}
      />
      <EditMovieModal
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        onSuccess={loadMovies}
        genres={genres}
        initialValues={movieToEdit}
      />
    </section>
  );
};
