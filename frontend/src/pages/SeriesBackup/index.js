import { useEffect, useState } from "react";
import { Table, notification } from "antd";

import { getSeriesBackup } from "../../api/backup";
import { formatDate } from "../../utils/formatDate";

export const SeriesBackup = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const loadSeries = async () => {
      try {
        const data = await getSeriesBackup();
        setSeries(data);
      } catch {
        notification.error({ message: "Houve um erro ao carregar as series" });
      }
    };

    loadSeries();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id_serie",
      key: "id_serie",
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
      title: "Usuário",
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
      <h2>Backup - Séries</h2>
      <Table columns={columns} dataSource={series} />
    </section>
  );
};
