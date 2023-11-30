import { useEffect, useState } from "react";
import { Table, notification } from "antd";

import { getMoviesWithGenre } from "../../api/movies";

export const MoviesWithGenre = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getMoviesWithGenre();
        setMovies(data);
      } catch {
        notification.error({ message: "Houve um erro ao carregar os filmes" });
      }
    };

    loadMovies();
  }, []);

  const columns = [
    {
      title: "Nome",
      dataIndex: "filme_nome",
      key: "filme_nome",
    },
    {
      title: "Sinopse",
      dataIndex: "filme_sinopse",
      key: "filme_sinopse",
    },
    {
      title: "Duração (min)",
      dataIndex: "filme_duracao",
      key: "filme_duracao",
    },
    {
      title: "Avalicação",
      dataIndex: "filme_avaliacao",
      key: "filme_avaliacao",
    },
    {
      title: "Nome do gênero",
      dataIndex: "genero_nome",
      key: "genero_nome",
    },
    {
      title: "Descrição do gênero",
      dataIndex: "genero_descricao",
      key: "genero_descricao",
    },
  ];

  return (
    <section>
      <h2>Filmes com gênero</h2>
      <Table columns={columns} dataSource={movies} />
    </section>
  );
};
