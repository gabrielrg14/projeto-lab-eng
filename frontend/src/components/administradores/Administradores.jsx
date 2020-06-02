import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'user-plus',
    title: 'Lista de Administradores',
    subtitle: 'Administradores / Lista'
}

const initialState = {
    administradores: [
        { nome: 'Rodrigo', grupo: 'Grupo X', mensalidade: 'Em dia', status: 'Ativo', ultima_mensalidade: '2017-10-31 23:12:00' },
        { nome: 'Gabriel', grupo: 'Grupo Y', mensalidade: 'Pendente', status: 'Desativado', ultima_mensalidade: '2017-10-31 24:15:00' },
        { nome: 'Felipe', grupo: 'Grupo Z', mensalidade: 'Atrasada', status: 'Desativado', ultima_mensalidade: '2017-10-31 24:27:02' }
    ],
}

export default class UserCrud extends Component {

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
                    <i class="fa fa-caret-down ml-3"></i>
                </button>

                {/* Início Modal novo Administrador */}
                <div class="modal fade" id="inserirNovoAdministrador" tabindex="-1" role="dialog" aria-labelledby="ModalNovoAdministrador" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalNovoAdministrador"><i className="fa fa-plus mr-3"></i> Novo administrador</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
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
                                                <label>CPF</label>
                                                <input type="text" className="form-control" name="cpf" placeholder="CPF do administrador" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Celular</label>
                                                <input type="text" className="form-control" name="celular" placeholder="Celular do administrador" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Data de Nascimento</label>
                                                <input type="date" className="form-control" name="data-nascimento" />
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

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-primary">Salvar</button>
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
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Grupo</th>
                        <th>Mensalidade</th>
                        <th>Status</th>
                        <th>Última mensalidade</th>
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
                    <td>{administrador.grupo}</td>
                    <td>{administrador.mensalidade}</td>
                    <td>{administrador.status}</td>
                    <td>{administrador.ultima_mensalidade}</td>
                    <td>
                        <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#editarAdministrador">
                            <i className="fa fa-pencil"></i>
                        </button>

                        {/* Início Modal editar Administrador */}
                        <div class="modal fade" id="editarAdministrador" tabindex="-1" role="dialog" aria-labelledby="ModalEditarAdministrador" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="ModalEditarAdministrador"><i className="fa fa-pencil"></i> Editar administrador</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
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
                                                        <label>CPF</label>
                                                        <input type="text" className="form-control" name="cpf" placeholder="CPF do administrador" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Celular</label>
                                                        <input type="text" className="form-control" name="celular" placeholder="Celular do administrador" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Celular do Responsável</label>
                                                        <input type="text" className="form-control" name="celular-resp" placeholder="Celular do responsável" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Data de Nascimento</label>
                                                        <input type="date" className="form-control" name="data-nascimento" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Data de Cadastro</label>
                                                        <input type="date" className="form-control" name="data-cadastro" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-md-6 campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Grupo</label>
                                                        <select className="form-control">
                                                            <option selected disabled>Selecione...</option>
                                                            <option value="grupo-x">Grupo X</option>
                                                            <option value="grupo-x">Grupo Y</option>
                                                            <option value="grupo-x">Grupo Z</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 campo-form-modal">
                                                    <div className="form-group">
                                                        <label for="status">Status</label>
                                                        <select className="form-control" id="status">
                                                            <option selected disabled>Selecione...</option>
                                                            <option value="ativado">Ativado</option>
                                                            <option value="desativado">Desativado</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="button" class="btn btn-primary">Salvar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fim Modal editar Administrador */}

                        <button type="button" className="btn btn-danger ml-1" data-toggle="modal" data-target="#excluirAdministrador">
                            <i className="fa fa-trash"></i>
                        </button>

                        {/* Início Modal excluir Administrador */}
                        <div class="modal fade" id="excluirAdministrador" tabindex="-1" role="dialog" aria-labelledby="ModalExcluirAdministrador" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="ModalExcluirAdministrador"><i className="fa fa-trash"></i> Excluir administrador</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        Tem certeza que deseja excluir o administrador {administrador.nome}?
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="button" class="btn btn-danger">Sim</button>
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

    render() {
        return (
            <Main {...headerProps}>
                {this.renderTopButtons()}
                {this.renderTable()}
            </Main>
        )
    }
}