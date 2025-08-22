import React, { useState, useEffect } from "react";
import axios from "axios";
import API_ROUTES from '../../config/apiConfig';

const apiUrlaccountsReceive = API_ROUTES.accountsReceive;
const apiUrlClient = API_ROUTES.clients;
const apiUrlPaymentMethods = API_ROUTES.paymentMethods; // <-- NOVO

function AccountsReceivable() {
  const [accounts, setAccounts] = useState([]);
  const [clients, setClients] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]); // <-- NOVO
  const [filterStatus, setFilterStatus] = useState("Todas");

  const [newAccount, setNewAccount] = useState({
    client_id: "",
    vencimento: "",
    paymentMethod: "",
    value: "",
  });

  useEffect(() => {
    fetchClients();
    fetchAccounts();
    fetchPaymentMethods(); // <-- NOVO
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(apiUrlClient);
      setClients(response.data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(apiUrlaccountsReceive);
      const formatted = response.data.map(acc => ({
        ...acc,
        clientName: acc.Client?.name || "Desconhecido",
      }));
      setAccounts(formatted);
    } catch (error) {
      console.error("Erro ao carregar contas:", error);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get(apiUrlPaymentMethods);
      setPaymentMethods(response.data);
    } catch (error) {
      console.error("Erro ao carregar métodos de pagamento:", error);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("pt-BR");
  };

  const filteredAccounts = accounts.filter((acc) => {
    if (filterStatus === "Todas") return true;
    return acc.status === filterStatus;
  });

  const totalPendente = accounts
    .filter((acc) => acc.status === "Pendente")
    .reduce((sum, acc) => sum + parseFloat(acc.value), 0);

  const handleInputChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  const handleAddAccount = async () => {
    const { client_id, vencimento, value, paymentMethod } = newAccount;

    if (!client_id || !vencimento || !value || !paymentMethod) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await axios.post(apiUrlaccountsReceive, {
        client_id,
        vencimento,
        value: parseFloat(value),
        paymentMethod,
        status: "Pendente",
      });

      fetchAccounts();
      setNewAccount({
        client_id: "",
        vencimento: "",
        paymentMethod: "",
        value: "",
      });
    } catch (error) {
      console.error("Erro ao adicionar conta:", error.response.data);
    }
  };

  const handleMarkAsReceived = async (id) => {
    try {
      await axios.put(`${apiUrlaccountsReceive}${id}`, {
        status: "Recebido",
      });
      fetchAccounts();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir esta conta?")) {
      try {
        await axios.delete(`${apiUrlaccountsReceive}${id}`);
        fetchAccounts();
      } catch (error) {
        console.error("Erro ao excluir conta:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📥 Contas a Receber</h2>

      {/* Formulário */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="mb-3">Adicionar Nova Conta</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Cliente</label>
            <select
              className="form-select"
              name="client_id"
              value={newAccount.client_id}
              onChange={handleInputChange}
            >
              <option value="">Selecione um cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Vencimento</label>
            <input
              type="date"
              className="form-control"
              name="vencimento"
              value={newAccount.vencimento}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Método de Pagamento</label>
            <select
              className="form-select"
              name="paymentMethod"
              value={newAccount.paymentMethod}
              onChange={handleInputChange}
            >
              <option value="">Selecione</option>
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.description}>
                  {method.description}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Valor (R$)</label>
            <input
              type="number"
              className="form-control"
              name="value"
              value={newAccount.value}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button
              className="btn btn-success w-100"
              onClick={handleAddAccount}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>

      {/* Filtro e total */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <label className="me-2">Filtrar por status:</label>
          <select
            className="form-select d-inline-block w-auto"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Todas">Todas</option>
            <option value="Pendente">Pendentes</option>
            <option value="Recebido">Recebidas</option>
          </select>
        </div>
        <div>
          <strong>💰 Total a receber (pendente): R$ {totalPendente.toFixed(2)}</strong>
        </div>
      </div>

      {/* Tabela */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Vencimento</th>
            <th>Valor (R$)</th>
            <th>Método</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                Nenhuma conta encontrada.
              </td>
            </tr>
          ) : (
            filteredAccounts.map((acc) => (
              <tr key={acc.id}>
                <td>{acc.id}</td>
                <td>{acc.clientName}</td>
                <td>{formatDate(acc.vencimento)}</td>
                <td>{parseFloat(acc.value).toFixed(2)}</td>
                <td>{acc.paymentMethod}</td>
                <td>
                  <span
                    className={`badge ${
                      acc.status === "Recebido" ? "bg-success" : "bg-warning"
                    }`}
                  >
                    {acc.status}
                  </span>
                </td>
                <td>
                  {acc.status === "Pendente" && (
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleMarkAsReceived(acc.id)}
                    >
                      Marcar como Recebido
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(acc.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AccountsReceivable;
