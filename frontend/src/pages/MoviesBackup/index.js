import { useEffect, useState } from "react";
import { Table, notification } from "antd";

import { getMoviesBackup } from "../../api/backup";
import { formatDate } from "../../utils/formatDate";

export const MoviesBackup = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getMoviesBackup();
        setMovies(data);
      } catch {
        notification.error({ message: "Houve um erro ao carregar os filmes" });
      }
    };

    loadMovies();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id_filme",
      key: "id_filme",
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
      title: "Usuario",
      dataIndex: "usuario_backup",
      key: "usuario_backup",
    },
    {
      title: "Data exclusão",
      dataIndex: "data_backup",
      key: "data_backup",
      render: (date) => formatDate(date),
    },
  ];

  return (
    <section>
      <h2>Backup - Filmes</h2>
      <Table columns={columns} dataSource={movies} />
    </section>
  );
};
