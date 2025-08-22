// src/config/apiConfig.js

const BASE_URL = 'http://10.5.1.34:3099';
// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API_ROUTES = {
  login: `${BASE_URL}/api/users/login/`,
  users: `${BASE_URL}/api/users/`,
  clients: `${BASE_URL}/api/clients/`,
  suppliers: `${BASE_URL}/api/suppliers/`,
  products: `${BASE_URL}/api/products/`,
  paymentMethods: `${BASE_URL}/api/payment-methods/`,
  enterProduct: `${BASE_URL}/api/enter-product/`,
  stock: `${BASE_URL}/api/stock/`,
  accountsPay: `${BASE_URL}/api/accounts-pay/`,
  accountsReceive: `${BASE_URL}/api/accounts-receive/`,
  orders: `${BASE_URL}/api/order/`,
  orderItens: `${BASE_URL}/api/order-item/`,
  sales: `${BASE_URL}/api/sales/`,
  emprises: `${BASE_URL}/api/emprises/`,
  services: `${BASE_URL}/api/services/`,
  orderServices: `${BASE_URL}/api/orderServices/`,
  orderServicesItens: `${BASE_URL}/api/orderServiceItens/`,
  salesServices: `${BASE_URL}/api/salesServices/`,
  // pode continuar adicionando endpoints conforme a estrutura da API
};

export default API_ROUTES;
