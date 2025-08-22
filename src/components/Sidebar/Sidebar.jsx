import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_ROUTES from '../../config/apiConfig';


function Sidebar() {

    const apiUrlEmprise = API_ROUTES.emprises
    // Estado para armazenar o nome da empresa
    const [companyName, setCompanyName] = useState('');

    // Função para buscar o nome da empresa da API
    const fetchCompanyName = async () => {
        try {
            const response = await axios.get(`${apiUrlEmprise}1`);
            // Atualiza o estado com o nome da empresa vindo da API
            setCompanyName(response.data.razaoSocial); // Supondo que a resposta tenha a chave 'name' para o nome da empresa
        } catch (error) {
            console.error("Erro ao buscar o nome da empresa:", error);
            setCompanyName('UNI HOSPITALAR'); // Em caso de erro, um nome padrão
        }
    };

    // Chama a função quando o componente for montado
    useEffect(() => {
        fetchCompanyName();
    }, []); // O array vazio faz com que o efeito seja executado apenas uma vez após o componente ser montado

    return (
        <div className="sidebar">
            <div className="deznav">
                <div className="deznav-scroll">
                    <ul className="metismenu" id="menu">
                        <li className="menu-title">{companyName || 'Carregando...'}</li> {/* Exibe o nome da empresa ou 'Carregando...' enquanto aguarda a resposta */}
                        
                        {/* <!-- Cadastro --> */}
                        <li>
                            <a className="has-arrow" href="#" aria-expanded="false">
                                <div className="menu-icon">
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 2.5C14.5899 2.5 17.5 5.41015 17.5 9C17.5 12.5899 14.5899 15.5 11 15.5C7.41015 15.5 4.5 12.5899 4.5 9C4.5 5.41015 7.41015 2.5 11 2.5Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M2.5 19.5C2.5 16.5 6.5 14 11 14C15.5 14 19.5 16.5 19.5 19.5" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <span className="nav-text">Comercial</span>
                            </a>
                            <ul>
                                <li><a href="/">Consiliação de Débito e Crédito Ache</a></li>
                                {/* <li><a href="/clientes">Cliente</a></li>
                                <li><a href="/fornecedor">Fornecedor</a></li>
                                <li><a href="/Produtos">Produto</a></li>
                                <li><a href="/services">Serviços</a></li>
                                <li><a href="/metodo-pagamento">Método de Pagamento</a></li> */}
                            </ul>
                        </li>

                         {/* <!-- Estoque --> */}
                {/* <li>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="menu-icon">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5H19V19H3V5Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 2V5M14 2V5M3 9H19" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="nav-text">Estoque</span>
                    </a>
                    <ul >
                        <li><a href="/listaEntradaProdutos">Entrada de Produtos</a></li> 
                        <li><a href="cadastro-cliente.html">Relatórios</a></li>
                        <li><a href="/estoque">Listar</a></li>
                    </ul>
                </li> */}
                
                {/* <!-- Financeiro --> *}
                {/* <li>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="menu-icon">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 11H17" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M11 5V17" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1 1H21V21H1V1Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="nav-text">Financeiro</span>
                    </a>
                    <ul >
                        <li><a href="/pagar">Contas a Pagar</a></li>
                        <li><a href="/receber">Contas a Receber</a></li>
                        <li><a href="/fluxo-caixa">Fluxo de Caixa</a></li> */}
                        {/* <li><a href="/contabil">Contabil</a></li>
                        <li><a href="/fiscal">Fiscal</a></li> */}
                    {/* </ul>
                </li> */}

                
                {/* <!-- Vendas --> */}
                {/* <li>
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="menu-icon">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 2L4 20H18L16 2H6Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10 9H12" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10 13H12" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="nav-text">Vendas</span>
                    </a>
                    <ul>
                        <li><a href="/vendas">Vendas</a></li>
                         <li><a href="/venda-servicos">Serviços</a></li> 
                    </ul>
                </li> */}
                
                {/* <!-- Configurações --> */}
                {/* <li>
                    <a href="/configuracoes" aria-expanded="false">
                        <div className="menu-icon">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 15.5C13.2091 15.5 15 13.7091 15 11.5C15 9.29086 13.2091 7.5 11 7.5C8.79086 7.5 7 9.29086 7 11.5C7 13.7091 8.79086 15.5 11 15.5Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4.5 4.5L6.5 6.5" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M15.5 15.5L17.5 17.5" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="nav-text">Configurações</span>
                    </a>
                </li> */}
                
                {/* <!-- Sair --> */}
                <li>
                    <a href="/logoff" aria-expanded="false">
                        <div className="menu-icon">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 7L12 11L8 15" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 11H3M19 2H7C5.89543 2 5 2.89543 5 4V18C5 19.1046 5.89543 20 7 20H19C20.1046 20 21 19.1046 21 18V4C21 2.89543 20.1046 2 19 2Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="nav-text">Sair</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    </div>
  );
}

export default Sidebar;
