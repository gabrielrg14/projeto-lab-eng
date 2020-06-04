import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'square-o',
    title: 'Lista de Materiais',
    subtitle: 'Materiais / Lista'
}

const initialState = {
    materiais: [
        { nome: 'Material X', unidades: '1', ultimo_fornecedor: 'Seu Zé da Esquina' },
        { nome: 'Material Y', unidades: '2', ultimo_fornecedor: 'Jobersvau' },
        { nome: 'Material Z', unidades: '3', ultimo_fornecedor: 'Dona Verenice' }
    ],
}

export default class Materiais extends Component {

    state = { ...initialState }

    renderTopButtons() {
        return (
            <div className="text-right">
                <button className="btn btn-primary mr-1" data-toggle="modal" data-target="#inserirNovoMaterial">
                    <i className="fa fa-plus mr-3"></i>Novo material
                </button>
                <button className="btn btn-dark ml-1 mr-1" data-toggle="modal" data-target="#inserirNovaCompra">
                    <i className="fa fa-plus mr-3"></i>
                    Nova compra
                </button>
                <button className="btn btn-dark ml-1">
                    Ações
                    <i className="fa fa-caret-down ml-3"></i>
                </button>

                {/* Inicio Modal Novo Material */}
                <div className="modal fade" id="inserirNovoMaterial" tabindex="-1" role="dialog" aria-labelledby="ModalNovoMaterial" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalNovoMaterial"><i className="fa fa-plus mr-3"></i> Novo material</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form">
                                    <div className="row">
                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Nome</label>
                                                <input type="text" className="form-control" name="name" placeholder="Nome do material" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Unidades</label>
                                                <input type="text" className="form-control" name="unidades" placeholder="Unidades do material" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-primary">Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Fim Modal Novo Material */}

                {/* Início Modal Nova Compra de Material */}
                <div className="modal fade" id="inserirNovaCompra" tabindex="-1" role="dialog" aria-labelledby="ModalNovaCompra" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalNovaCompra"><i className="fa fa-plus mr-3"></i> Nova Compra de Material</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form">
                                    <div className="row">
                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Nome do material</label>
                                                <input type="text" className="form-control" name="nome-material-compra" placeholder="Nome do material" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Unidades</label>
                                                <input type="text" className="form-control" name="unidades" placeholder="Unidades do material" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Fornecedor</label>
                                                <input type="text" className="form-control" name="fornecedor" placeholder="Fornecedor do material" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Data da compra</label>
                                                <input type="date" className="form-control" name="data-compra" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 offset-md-3 text-left text-md-center campo-form-modal">
                                            <div className="form-group">
                                                <label>Valor da compra</label>
                                                <input type="text" className="form-control" name="valor-compra" placeholder="R$ 0,00" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-primary">Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Fim Modal Nova Compra de Material */}
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table table-hover mt-4 text-center">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Unidades</th>
                        <th>Último fornecedor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.materiais.map(material => {
            return (
                <tr key='1'>
                    <td>{material.nome}</td>
                    <td>{material.unidades}</td>
                    <td>{material.ultimo_fornecedor}</td>
                    <td>
                        <button className="btn btn-warning" data-toggle="modal" data-target="#editarMaterial">
                            <i className="fa fa-pencil"></i>
                        </button>

                        <button className="btn btn-danger ml-1" data-toggle="modal" data-target="#excluirMaterial">
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>

                    {/* Início Modal editar Material */}
                    <div className="modal fade" id="editarMaterial" tabindex="-1" role="dialog" aria-labelledby="ModalEditarMaterial" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ModalEditarMaterial"><i className="fa fa-pencil"></i> Editar material</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form">
                                        <div className="row">
                                            <div className="col-12 col-md-6 text-left campo-form-modal">
                                                <div className="form-group">
                                                    <label>Nome</label>
                                                    <input type="text" className="form-control" name="nome" value={material.nome} placeholder="Nome do grupo" />
                                                </div>
                                            </div>

                                            <div className="col-12 col-md-6 text-left campo-form-modal">
                                                <div className="form-group">
                                                    <label>Unidades</label>
                                                    <input type="text" className="form-control" name="unidades" value={material.unidades} placeholder="Unidades do material" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-8 offset-md-2 text-left text-md-center campo-form-modal">
                                            <div className="form-group">
                                                <label>Último Fornecedor comprado</label>
                                                <input type="text" className="form-control" name="ultimo-fornecedor" placeholder="Último fornecedor comprado" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                    <button type="button" className="btn btn-primary">Salvar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Fim Modal editar Material */}

                    {/* Início Modal excluir Material */}
                    <div className="modal fade" id="excluirMaterial" tabindex="-1" role="dialog" aria-labelledby="ModalExcluirMaterial" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ModalExcluirMaterial"><i className="fa fa-trash"></i> Excluir material</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Tem certeza que deseja excluir o material {material.nome}?
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                    <button type="button" className="btn btn-danger">Sim</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Fim Modal excluir Material */}
                </tr>
            )
        });
    }

    renderBottomButtons() {
        return (
            <div className="paginacao-lista">
                <nav>
                    <ul className="pagination justify-content-end">
                        <li className="page-item disabled"><a className="page-link" href="#">&laquo;</a></li>
                        <li className="page-item active" ><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item disabled"><a className="page-link" href="#">&raquo;</a></li>
                    </ul>
                </nav>
            </div>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderTopButtons()}
                {this.renderTable()}
                {this.renderBottomButtons()}
            </Main>
        )
    }
}