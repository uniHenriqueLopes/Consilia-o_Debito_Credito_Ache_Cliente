import React from "react";
// 1. Importações necessárias do react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./page/Home"; // Supondo que o caminho para o componente Home esteja correto

/**
 * Este componente gerencia a renderização das rotas.
 * Ele foi criado para agrupar a lógica de roteamento e
 * utilizar o hook `useLocation`.
 */
function AppRoutes() {
  return (
    <div className="App">

      <Routes>
        
        {/* Rotas da aplicação */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </div>
  );
}

/**
 * Componente principal da aplicação, que configura o Router.
 */
function App() {
  return (
    // O Router deve envolver os componentes que utilizam a lógica de roteamento
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;