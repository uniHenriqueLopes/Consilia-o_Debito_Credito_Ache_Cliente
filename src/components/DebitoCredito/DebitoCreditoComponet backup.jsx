import React, { useRef } from 'react'

function DebitoCreditoComponet() {
    const fileInputRef = useRef(null);

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

    return (
        <div className="debitoCredito">
            <div className="container-fluid">
                <h2 className="text-center mb-4">Conciliação Crédito e Débito Ache</h2>

                {/* Formulário */}
                <div className="card p-4 mb-4 shadow-sm">
                    <h5 className="mb-3">Filtrar Pedidos</h5>
                    <div className="row g-4">
                        {/* Coluna Esquerda */}
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Pedido OL</label>
                                <input type="text" className="form-control" name="pedido_ol" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Pedido de Venda</label>
                                <input type="text" className="form-control" name="pedido_venda" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Número NF</label>
                                <input type="text" className="form-control" name="numero_nf" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nome do Produto</label>
                                <input type="text" className="form-control" name="nome_produto" />
                            </div>
                        </div>

                        {/* Coluna Direita */}
                        <div className="col-md-6">
                            <div className="mb-3">
                                {/* <label className="form-label">Data de Entrada do Pedido OL</label> */}
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="form-label">Data de Entrada do Pedido OL Inicio</label>
                                        <input type="date" className="form-control" name="data_pedido_ol_inicio" placeholder="Início" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Data de Entrada do Pedido OL Fim</label>
                                        <input type="date" className="form-control" name="data_pedido_ol_fim" placeholder="Fim"/>
                                    </div>
                                </div>
                            </div>

                            {/* Data de Emissão da NF (Intervalo) */}
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="form-label">Data de Emissão da NF Inicio</label>
                                        <input type="date" className="form-control" name="data_emissao_nf_inicio" placeholder="Início"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Data de Emissão da NF Fim</label>
                                        <input type="date" className="form-control" name="data_emissao_nf_fim" placeholder="Fim"/>
                                    </div>
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

                    {/* Botões */}
                    <div className="row mt-3">
                        <div className="col-md-2">
                            <button className="btn btn-primary w-100">Pesquisar</button>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-secondary w-100" type="reset">Limpar</button>
                        </div>
                    </div>
                </div>

                {/* Tabela */}
                <div class="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>

                                <th>Status</th>

                                <th>Pedido OL</th>

                                <th>Pedido_Venda</th>
                                <th>Numero_nota</th>
                                <th>Status_NF</th>
                                <th>emissão_NF</th>
                                <th>Codigo_Produto</th>
                                <th>Produto_descricao</th>
                                <th>quantidade_OL</th>
                                <th>Qtd_Atendida_OL</th>
                                <th>Qtd_Pedido_Venda</th>
                                <th>Qtd_Faturada</th>
                                <th>Qtd_Ache</th>
                                <th>RFValorDebito</th>
                                <th>RFAjusteTributario</th>
                                <th>Desconto</th>
                                <th>DescPadrao</th>
                                <th>DataEntradaArquivo</th>
                                <th>Empresa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Conciliado</td>
                                <td>OL123456</td>
                                <td>PV987654</td>
                                <td>NF2025081001</td>
                                <td>Emitida</td>
                                <td>2025-08-10</td>
                                <td>PRD00123</td>
                                <td>Seringa Descartável 10ml</td>
                                <td>500</td>
                                <td>500</td>
                                <td>500</td>
                                <td>500</td>
                                <td>500</td>
                                <td>R$ 12.500,00</td>
                                <td>R$ 0,00</td>
                                <td>R$ 500,00</td>
                                <td>10%</td>
                                <td>2025-08-11</td>
                                <td>Uni Hospitalar</td>
                            </tr> <tr> <td>2</td>
                                <td>Conciliado</td>
                                <td>OL123457</td>
                                <td>PV987655</td>
                                <td>NF2025081002</td>
                                <td>Emitida</td>
                                <td>2025-08-10</td>
                                <td>PRD00456</td>
                                <td>Luvas de Procedimento M</td>
                                <td>1000</td>
                                <td>700</td>
                                <td>1000</td>
                                <td>700</td>
                                <td>700</td>
                                <td>R$ 7.000,00</td>
                                <td>R$ 100,00</td>
                                <td>R$ 300,00</td>
                                <td>5%</td>
                                <td>2025-08-11</td>
                                <td>Uni Hospitalar</td>
                            </tr> <tr> <td>3</td>
                                <td>Não Conciliado</td>
                                <td>OL123458</td>
                                <td>PV987656</td>
                                <td>NF2025081003</td>
                                <td>Cancelada</td>
                                <td>2025-08-09</td>
                                <td>PRD00789</td>
                                <td>Álcool 70% 1L</td>
                                <td>200</td>
                                <td>0</td>
                                <td>200</td>
                                <td>0</td>
                                <td>0</td>
                                <td>R$ 0,00</td>
                                <td>R$ 0,00</td>
                                <td>R$ 0,00</td>
                                <td>0%</td>
                                <td>2025-08-11</td>
                                <td>Uni Hospitalar</td>
                            </tr> <tr> <td>4</td>
                                <td>Conciliado</td>
                                <td>OL123459</td>
                                <td>PV987657</td>
                                <td>NF2025081004</td>
                                <td>Emitida</td>
                                <td>2025-08-11</td>
                                <td>PRD00321</td>
                                <td>Máscara Cirúrgica Tripla</td>
                                <td>1500</td>
                                <td>1500</td>
                                <td>1500</td>
                                <td>1500</td>
                                <td>1500</td>
                                <td>R$ 18.000,00</td>
                                <td>R$ 0,00</td>
                                <td>R$ 900,00</td>
                                <td>15%</td>
                                <td>2025-08-12</td>
                                <td>Uni Hospitalar</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Conciliado</td>
                                <td>OL123460</td>
                                <td>PV987658</td>
                                <td>NF2025081005</td>
                                <td>Emitida</td>
                                <td>2025-08-10</td>
                                <td>PRD00987</td>
                                <td>Termômetro Digital</td>
                                <td>100</td>
                                <td>60</td>
                                <td>100</td>
                                <td>60</td>
                                <td>60</td>
                                <td>R$ 3.600,00</td>
                                <td>R$ 0,00</td>
                                <td>R$ 200,00</td>
                                <td>8%</td>
                                <td>2025-08-12</td>
                                <td>Uni Hospitalar</td>
                            </tr>
                        </tbody>
                    </table>
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
    )
}

export default DebitoCreditoComponet
