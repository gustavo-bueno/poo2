import { useEffect, useState } from "react";
import { Table, notification } from "antd";

import { getSeriesWithGenre } from "../../api/series";

export const SeriesWithGenre = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const loadSeries = async () => {
      try {
        const data = await getSeriesWithGenre();
        setSeries(data);
      } catch {
        notification.error({ message: "Houve um erro ao carregar as series" });
      }
    };

    loadSeries();
  }, []);

  const columns = [
    {
      title: "Nome",
      dataIndex: "serie_nome",
      key: "serie_nome",
    },
    {
      title: "Sinopse",
      dataIndex: "serie_sinopse",
      key: "serie_sinopse",
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
      <h2>Séries com gênero</h2>
      <Table columns={columns} dataSource={series} />
    </section>
  );
};
