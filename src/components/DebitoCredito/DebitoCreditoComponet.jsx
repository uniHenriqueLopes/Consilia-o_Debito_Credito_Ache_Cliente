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



// 🔽 Função para parsear CSV com suporte a aspas
    const parseCSV = (text) => {
        const rows = [];
        let row = [];
        let value = '';
        let insideQuotes = false;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];

            if (char === '"' && insideQuotes && nextChar === '"') {
                value += '"';
                i++;
            } else if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                row.push(value.trim());
                value = '';
            } else if ((char === '\n' || char === '\r') && !insideQuotes) {
                if (value !== '' || row.length > 0) {
                    row.push(value.trim());
                    rows.push(row);
                    row = [];
                    value = '';
                }
                if (char === '\r' && nextChar === '\n') i++;
            } else {
                value += char;
            }
        }

        if (value !== '' || row.length > 0) {
            row.push(value.trim());
            rows.push(row);
        }

        return rows;
    };



// 🔽 Manipula importação do arquivo
    const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
        const text = e.target.result;
        const parsed = parseCSV(text);

        if (parsed.length < 2) {
            alert("Arquivo CSV inválido ou vazio.");
            return;
        }

        const headers = parsed[0];
        const rows = parsed.slice(1);

        const jsonParaBanco = rows.map((row) => {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header.trim()] = row[index]?.trim() ?? '';
            });

            return {
                Nome_do_Grupo: obj["Nome do Grupo"],
                CNPJ_Distribuidor: obj["CNPJ Distribuidor"],
                UF_origem: obj["UF origem"],
                Numero_NF: obj["NF"],
                EAN: obj["EAN"],
                Dat_Emissao: obj["Data NF"],
                Codigo_Material: obj["Código material"],
                Apresentacao: obj["Apresentação produto"],
                Familia: obj["Família"],
                Qtd_Faturada: obj["Quantidade faturada"],
                Quantidade_Produto_Uni: obj["Quantidade atendida"],
                UF_Destino: 'UF destino', // pode ser calculado se necessário
                Valor_Total_UNI: obj["Valor Bruto"],
                Valor_Debito_Final: obj["Débito final"],
                Valor_Bruto: obj["Valor Bruto"],
                Valor_Debito_Bruto: obj["Débito Líquido"],
                RF_Ajuste_Tributario: obj["Ajuste tributário"],
                prct_Desconto: obj["% Desc. Calculado"],
                prct_Desconto_Padrao: obj["% Desc. Padrão"],
                prct_Custo_Margem: obj["% OL (margem/spread)"],
                prct_Debito: obj["% Repasse"],
                RF_Aliquota_Interestadual: obj["% ICMS"],
                RF_PISCofins: obj["% Pis e Cofins"],
                RF_RedutorICMS: '',
                Empresa: obj["CNPJ Distribuidor"]
            };
        });

        // ❗ Remover exibição na tabela, se não quiser mostrar os dados
        // setDadosFiltrados(jsonParaBanco); ← remova ou comente esta linha

        // ✅ Enviar para o backend
        try {
            // const response = await fetch('http://localhost:3005/api/conciliacoes/importar', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(jsonParaBanco)
            // });

            console.log(jsonParaBanco)

            // if (!response.ok) {
            //     const errorData = await response.json();
            //     alert(`Erro ao importar: ${errorData.message}`);
            //     return;
            // }

            alert("Dados importados com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            alert("Erro ao enviar os dados para o servidor.");
        }
    };

    reader.readAsText(file, 'UTF-8');
};




    const getRowStyleByStatus = (status) => {
        switch (status?.toUpperCase()) {
            case 'NÃO CONCILIADO':
                return { backgroundColor: '#f8d7da' }; // Vermelho claro
            case 'CONCILIADO':
                return { backgroundColor: '#d4edda' }; // Verde claro
            case 'NÃO FATURADA':
                return { backgroundColor: '#fff3cd' }; // Amarelo claro
            default:
                return {}; // Sem cor
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
                                    accept=".csv"
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
                    <table className="table table-bordered table-striped display" style={{ fontSize: '0.7rem' }}>
                        <thead className="table-light-">
                            <tr>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>Status</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>Pedido Venda</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>Nota_Ache</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>Número NF</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>Status NF</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>Emissão NF</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>Código Produto</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>Produto Descrição</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>Quantidade OL</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>Qtd Atendida OL</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>Preço Unitario</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>Valor Total UNI</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>Valor Debito</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>Valor Bruto</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>Valor Debito Bruto</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>RF Ajuste_Tributario</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>prct Desconto</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>prct Desconto_Padrao</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>prct Custo_Margem</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>prct Debito</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>RF Aliquota_Interestadual</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>RF PISCofins</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>RF RedutorICMS</th>
                                <th style={{ position: 'sticky', top: 0, backgroundColor: '#53555eff', fontSize: '0.72rem', color: 'white', fontWeight: 'bold' }}>Empresa</th>
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
                                        <td style={{ color: '#060607ff' }}>{item.Status}</td>
                                        <td style={{ color: '#060607ff' }}>{item.Pedido_Venda}</td>
                                        <td style={{ color: '#060607ff' }}>{item.Nota_Ache}</td>
                                        <td style={{ color: '#060607ff' }}>{item.Num_Nota}</td>
                                        <td style={{ color: '#060607ff' }}>{item.Status_NF}</td>
                                        <td style={{ color: '#060607ff' }}>{new Date(item.Dat_Emissao).toLocaleDateString('pt-BR')}</td>
                                        <td style={{ color: '#060607ff' }}>{item.codigo_Produto}</td>
                                        <td style={{ color: '#060607ff' }}>{item.Nome_Produto}</td>
                                        <td style={{ color: '#060607ff' }}>{item.Qtd_Faturada_Ache}</td>
                                        <td style={{ color: '#060607ff' }}>{item.Quantidade_Produto_Uni}</td>
                                        <td style={{ color: '#060607ff' }}>{item.Preço_Unitario_UNI}</td>
                                        <td style={{ color: '#060607ff' }}>{item.Valor_Total_UNI}</td>
                                        <td style={{ color: '#060607ff' }}>{item.Valor_Debito_Final}</td>
                                        <td style={{ color: '#060607ff' }}>{item.Valor_Bruto}</td>
                                        <td style={{ color: '#060607ff' }}>{item.Valor_Debito_Bruto}</td>
                                        <td style={{ color: '#060607ff' }}>{item.RF_Ajuste_Tributario}</td>
                                        <td style={{ color: '#060607ff' }}>{item.prct_Desconto}</td>
                                        <td style={{ color: '#060607ff' }}>{item.prct_Desconto_Padrao}</td>
                                        <td style={{ color: '#060607ff' }}>{item.prct_Custo_Margem}</td>
                                        <td style={{ color: '#060607ff' }}>{item.prct_Debito}</td>
                                        <td style={{ color: '#060607ff' }}>{item.RF_Aliquota_Interestadual}</td>
                                        <td style={{ color: '#060607ff' }}>{item.RF_PISCofins}</td>
                                        <td style={{ color: '#060607ff' }}>{item.RF_RedutorICMS}</td>
                                        <td style={{ color: '#060607ff' }}>{item.Empresa}</td>
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
