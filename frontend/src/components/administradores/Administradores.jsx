import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'suitcase',
    title: 'Lista de Administradores',
    subtitle: 'Administradores / Lista'
}

const initialState = {
    administradores: [
        { nome: 'Rodrigo', email: 'rodrigo@projlabeng.com', contato: '(19) 9875-2141' },
        { nome: 'Gabriel', email: 'gabriel@projlabeng.com', contato: '(19) 98132-1964' },
        { nome: 'Felipe', email: 'felipe@projlabeng.com', contato: '(19) 9885-2352' }
    ],
}

export default class Administradores extends Component {

    state = { ...initialState }

    renderTopButtons() {
        return (
            <div className="text-right">
                <button type="button" className="btn btn-primary mr-1" data-toggle="modal" data-target="#inserirNovoAdministrador">
                    <i className="fa fa-plus mr-3"></i>
                    Novo administrador
                </button>
                <button className="btn btn-dark ml-1">
                    Ações
                    <i className="fa fa-caret-down ml-3"></i>
                </button>

                {/* Início Modal novo Administrador */}
                <div className="modal fade" id="inserirNovoAdministrador" tabIndex="-1" role="dialog" aria-labelledby="ModalNovoAdministrador" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalNovoAdministrador"><i className="fa fa-plus mr-3"></i> Novo administrador</h5>
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
                                                <input type="text" className="form-control" name="name" placeholder="Nome do administrador" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Contato</label>
                                                <input type="text" className="form-control" name="contato" placeholder="Contato do administrador" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-8 offset-md-2 text-left text-md-center campo-form-modal">
                                            <div className="form-group">
                                                <label for="status">E-mail</label>
                                                <input type="email" className="form-control" name="email" placeholder="E-mail do administrador" />
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
                {/* Fim Modal novo Administrador */}
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table table-hover mt-4 text-center">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Contato</th>
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
        return this.state.administradores.map(administrador => {
            return (
                <tr>
                    <td>{administrador.nome}</td>
                    <td>{administrador.email}</td>
                    <td>{administrador.contato}</td>
                    <td>
                        <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#editarAdministrador">
                            <i className="fa fa-pencil"></i>
                        </button>

                        {/* Início Modal editar Administrador */}
                        <div className="modal fade" id="editarAdministrador" tabIndex="-1" role="dialog" aria-labelledby="ModalEditarAdministrador" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalEditarAdministrador"><i className="fa fa-pencil"></i> Editar administrador</h5>
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
                                                        <input type="text" className="form-control" name="name" value={administrador.nome} placeholder="Nome do administrador" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Contato</label>
                                                        <input type="text" className="form-control" name="contato" placeholder="Contato do administrador" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-md-8 offset-md-2 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>E-mail</label>
                                                        <input type="email" className="form-control" name="email" placeholder="E-mail do administrador" />
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
                        {/* Fim Modal editar Administrador */}

                        <button type="button" className="btn btn-danger ml-1" data-toggle="modal" data-target="#excluirAdministrador">
                            <i className="fa fa-trash"></i>
                        </button>

                        {/* Início Modal excluir Administrador */}
                        <div className="modal fade" id="excluirAdministrador" tabIndex="-1" role="dialog" aria-labelledby="ModalExcluirAdministrador" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalExcluirAdministrador"><i className="fa fa-trash"></i> Excluir administrador</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Tem certeza que deseja excluir o administrador {administrador.nome}?
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="button" className="btn btn-danger">Sim</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fim Modal excluir Administrador */}
                    </td>
                </tr>
            )
        });
    }

    renderBottomButtons() {
        return (
            <div className="paginacao-lista">
                <nav>
                    <ul className="pagination justify-content-end">
                        <li className="page-item disabled"><a className="page-link" href="">&laquo;</a></li>
                        <li className="page-item active" ><a className="page-link" href="">1</a></li>
                        <li className="page-item"><a className="page-link" href="">2</a></li>
                        <li className="page-item"><a className="page-link" href="">3</a></li>
                        <li className="page-item disabled"><a className="page-link" href="">&raquo;</a></li>
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