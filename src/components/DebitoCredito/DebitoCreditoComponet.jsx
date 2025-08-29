import React, { useRef, useState, useEffect } from 'react';

function DebitoCreditoComponet() {
    const fileInputRef = useRef(null);
    const tableRef = useRef(null);

    const [filters, setFilters] = useState({
        pedidoOl: '',
        pedidoVenda: '',
        numeroNota: '',
        produto: '',
        dataInicio: '',
        dataFim: ''
    });

    const [dadosFiltrados, setDadosFiltrados] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(30); // Itens por página

    useEffect(() => {
        if (tableRef.current) {
            tableRef.current.style.overflowY = 'auto'; // Garantir que a rolagem vertical esteja ativada
        }
    }, [dadosFiltrados]);

    const handleImportClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Arquivo selecionado:", file.name);
            // Aqui você pode chamar a função de leitura/envio do arquivo
        }
    };

    const handlePesquisar = async () => {
        try {
            const response = await fetch('http://localhost:3005/api/conciliacoes/filtrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filters),
            });

            if (!response.ok) {
                const erro = await response.json();
                alert("Erro: " + erro.message);
                return;
            }

            const data = await response.json();
            setDadosFiltrados(data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            alert("Erro ao buscar dados.");
        }
    };

    const handleLimpar = () => {
        setFilters({
            pedidoOl: '',
            pedidoVenda: '',
            numeroNota: '',
            produto: '',
            dataInicio: '',
            dataFim: ''
        });
        setDadosFiltrados([]);
    };

    const paginate = (dadosFiltrados, currentPage, itemsPerPage) => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return dadosFiltrados.slice(indexOfFirstItem, indexOfLastItem);
    };

    const totalPages = Math.ceil(dadosFiltrados.length / itemsPerPage);

    return (
        <div className="debitoCredito">
            <div className="container-fluid">
                <h2 className="text-center mb-4">Conciliação Crédito e Débito Ache</h2>

                <div className="card p-4 mb-4 shadow-sm">
                    <h5 className="mb-3">Filtrar Pedidos</h5>
                    <div className="row g-4">
                        {/* Coluna Esquerda */}
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Pedido OL</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="pedidoOl"
                                    value={filters.pedidoOl}
                                    onChange={(e) => setFilters({ ...filters, pedidoOl: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Pedido de Venda</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="pedidoVenda"
                                    value={filters.pedidoVenda}
                                    onChange={(e) => setFilters({ ...filters, pedidoVenda: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Número NF</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="numeroNota"
                                    value={filters.numeroNota}
                                    onChange={(e) => setFilters({ ...filters, numeroNota: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nome do Produto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="produto"
                                    value={filters.produto}
                                    onChange={(e) => setFilters({ ...filters, produto: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Coluna Direita */}
                        <div className="col-md-6">
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="form-label">Data de Início</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="dataInicio"
                                            value={filters.dataInicio}
                                            onChange={(e) => setFilters({ ...filters, dataInicio: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Data de Fim</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="dataFim"
                                            value={filters.dataFim}
                                            onChange={(e) => setFilters({ ...filters, dataFim: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Botão Importar Arquivo */}
                            <div className="d-flex justify-content-end mb-3">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                                <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={handleImportClick}
                                >
                                    📂 Importar Dados
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="row mt-3">
                        <div className="col-md-2">
                            <button className="btn btn-primary w-100" onClick={handlePesquisar}>Pesquisar</button>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-secondary w-100" onClick={handleLimpar}>Limpar</button>
                        </div>
                    </div>
                </div>

                {/* Tabela */}
                <div
                    className="table-responsive"
                    ref={tableRef}
                    style={{ maxHeight: '600px', overflowY: 'auto', overflowX: 'auto' }} // Definindo altura máxima e rolagem
                >
                    <table className="table table-bordered table-striped display" style={{ fontSize: '0.7rem'}}>
                        <thead className="table-light-">
                            <tr>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Status</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Pedido OL</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Pedido Venda</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Número NF</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Status NF</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Emissão NF</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Código Produto</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Produto Descrição</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Quantidade OL</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Qtd Atendida OL</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Qtd Pedido Venda</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Qtd Faturada</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Qtd Ache</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>RF Valor Débito</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>RF Ajuste Tributário</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Desconto</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Desc Padrão</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Data Entrada Arquivo</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem' , color:'white',  fontWeight: 'bold'}}>Empresa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginate(dadosFiltrados, currentPage, itemsPerPage).length === 0 ? (
                                <tr>
                                    <td colSpan="20" className="text-center">Nenhum dado encontrado</td>
                                </tr>
                            ) : (
                                paginate(dadosFiltrados, currentPage, itemsPerPage).map((item, index) => (
                                    <tr key={index}>
                                        <td style={{color:'#060607ff'}}>{item.Status}</td>
                                        <td style={{color:'#060607ff'}}>{item.Pedido_OL}</td>
                                        <td style={{color:'#060607ff'}}>{item.Pedido_Venda}</td>
                                        <td style={{color:'#060607ff'}}>{item.Numero_nota}</td>
                                        <td style={{color:'#060607ff'}}>{item.Status_NF}</td>
                                        <td style={{color:'#060607ff'}}>{new Date(item.emissão_NF).toLocaleDateString('pt-BR')}</td>
                                        <td style={{color:'#060607ff'}}>{item.Codigo_Produto}</td>
                                        <td style={{color:'#060607ff'}}>{item.Produto_descricao}</td>
                                        <td style={{color:'#060607ff'}}>{item.quantidadeOl}</td>
                                        <td style={{color:'#060607ff'}}>{item.Qtd_Faturada}</td>
                                        <td style={{color:'#060607ff'}}>{item.Qtd_Ache}</td>
                                        <td style={{color:'#060607ff'}}>{item.Qtd_Faturada}</td>
                                        <td style={{color:'#060607ff'}}>{item.Qtd_Ache}</td>
                                        <td style={{color:'#060607ff'}}>{item.RFValorDebito}</td>
                                        <td style={{color:'#060607ff'}}>{item.RFAjusteTributario}</td>
                                        <td style={{color:'#060607ff'}}>{item.Desconto}</td>
                                        <td style={{color:'#060607ff'}}>{item.Desconto_padrao}</td>
                                        <td style={{color:'#060607ff'}}>{item.DataEntradaArquivo}</td>
                                        <td style={{color:'#060607ff'}}>{item.Empresa}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginação */}
                <div className="d-flex justify-content-center mt-3">
                    <button
                        className="btn btn-outline-primary mx-2"
                        onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}
                    >
                        Anterior
                    </button>
                    <span className="my-auto">{`Página ${currentPage} de ${totalPages}`}</span>
                    <button
                        className="btn btn-outline-primary mx-2"
                        onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage)}
                    >
                        Próxima
                    </button>
                </div>

                {/* Botão Exportar */}
                <div className="col-md-2">
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown">Exportar</button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">XLSX</a>
                            <a className="dropdown-item" href="#">PDF</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DebitoCreditoComponet;
