import { useEffect, useState } from "react";
import { Button, Modal, Space, Table, Tag, notification } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { deleteUser, getUsers } from "../../api/users";
import { getPlans } from "../../api/plans";
import CreateUserModal from "../../components/CreateUserModal";
import EditUserModal from "../../components/EditUserModal";

const { confirm } = Modal;

export const Users = () => {
  const [userToEdit, setUserToEdit] = useState();
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      notification.error({ message: "Erro ao carregar usuários" });
    }
  };

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await getPlans();
        setPlans(data);
      } catch {
        notification.error({ message: "Erro ao carregar usuários" });
      }
    };

    loadPlans();
    loadUsers();
  }, []);

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Senha",
      dataIndex: "senha",
      key: "senha",
    },
    {
      title: "Plano",
      key: "plano",
      dataIndex: "plano",
      render: (record) => <Tag color="blue">{record}</Tag>,
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setUserToEdit(record);
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
                content: `O usuário ${record.nome} será excluído`,
                onOk: async () => {
                  await deleteUser(record.email);
                  await loadUsers();
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
      <h2>Usuários</h2>
      <Table columns={columns} dataSource={users} />
      <Button onClick={() => setOpenCreateModal(true)}>Criar usuário</Button>
      <CreateUserModal
        open={openCreateModal}
        onCancel={() => setOpenCreateModal(false)}
        plans={plans}
        onSucess={loadUsers}
      />
      <EditUserModal
        open={openEditModal}
        initialValues={userToEdit}
        onCancel={() => setOpenEditModal(false)}
        plans={plans}
        onSucess={loadUsers}
      />
    </section>
  );
};
