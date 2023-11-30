import { useEffect, useState } from "react";
import { Button, Modal, Space, Table, notification } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { deletePlan, getPlans } from "../../api/plans";
import EditPlanModal from "../../components/EditPlanModal";
import CreatePlanModal from "../../components/CreatePlanModal";
import { formatMoney } from "../../utils/formatMoney";

const { confirm } = Modal;

export const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [planToEdit, setPlanToEdit] = useState({});

  const loadPlans = async () => {
    try {
      const data = await getPlans();
      setPlans(data);
    } catch {
      notification.error({ message: "Não foi possível carregar os gêneros" });
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Preco",
      dataIndex: "preco",
      key: "preco",
      render: (record) => formatMoney(record),
    },
    {
      title: "Quant. de conexões",
      dataIndex: "qtd_conexoes",
      key: "qtd_conexoes",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setPlanToEdit(record);
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
                content: `O plano de id ${record.id} será excluído`,
                onOk: async () => {
                  await deletePlan(record.id);
                  await loadPlans();
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
      <Table columns={columns} dataSource={plans} />
      <Button onClick={() => setOpenCreateModal(true)}>Criar plano</Button>
      <CreatePlanModal
        initialId={plans[plans.length - 1]?.id + 1}
        open={openCreateModal}
        onCancel={() => setOpenCreateModal(false)}
        onSuccess={loadPlans}
      />
      <EditPlanModal
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        onSuccess={loadPlans}
        initialValues={planToEdit}
      />
    </section>
  );
};
