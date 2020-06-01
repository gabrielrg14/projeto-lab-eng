import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'pencil',
    title: 'Lista de Grupos',
    subtitle: 'Grupos / Lista'
}

const initialState = {
    grupos: [
        { nome: 'Grupo X', modalidade: 'Modalidade 1' },
        { nome: 'Grupo Y', modalidade: 'Modalidade 2' },
        { nome: 'Grupo Z', modalidade: 'Modalidade 3' }
    ],
}

export default class UserCrud extends Component {

    state = { ...initialState }

    renderTopButtons() {
        return (
            <div className="text-right">
                <button type="button" className="btn btn-primary mr-1" data-toggle="modal" data-target="#inserirNovoGrupo">
                    <i className="fa fa-plus mr-3"></i>
                    Novo grupo
                </button>
                <button className="btn btn-dark ml-1">
                    Ações
                    <i class="fa fa-caret-down ml-3"></i>
                </button>

                {/* Início Modal novo Grupo */}
                <div class="modal fade" id="inserirNovoGrupo" tabindex="-1" role="dialog" aria-labelledby="ModalNovoGrupo" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalNovoGrupo"><i className="fa fa-plus mr-3"></i> Novo grupo</h5>
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
                                                <input type="text" className="form-control" name="nome" placeholder="Nome do grupo" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Modalidade</label>
                                                <input type="text" className="form-control" name="modalidade" placeholder="Modalidade do grupo" />
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
                {/* Fim Modal novo Grupo */}
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Modalidade</th>
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
        return this.state.grupos.map(grupo => {
            return (
                <tr>
                    <td>{grupo.nome}</td>
                    <td>{grupo.modalidade}</td>
                    <td>
                        <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#editarGrupo">
                            <i className="fa fa-pencil"></i>
                        </button>

                        {/* Início Modal editar Grupo */}
                        <div class="modal fade" id="editarGrupo" tabindex="-1" role="dialog" aria-labelledby="ModalEditarGrupo" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="ModalEditarGrupo"><i className="fa fa-pencil"></i> Editar Grupo</h5>
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
                                                        <input type="text" className="form-control" name="name" value={grupo.nome} placeholder="Nome do grupo" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Modalidade</label>
                                                        <input type="text" className="form-control" name="cpf" placeholder="Modalidade do grupo" />
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
                        {/* Fim Modal editar Grupo */}

                        <button type="button" className="btn btn-danger ml-1" data-toggle="modal" data-target="#excluirGrupo">
                            <i className="fa fa-trash"></i>
                        </button>

                        {/* Início Modal excluir Grupo */}
                        <div class="modal fade" id="excluirGrupo" tabindex="-1" role="dialog" aria-labelledby="ModalExcluirGrupo" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="ModalExcluirGrupo"><i className="fa fa-trash"></i> Excluir grupo</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        Tem certeza que deseja excluir o grupo {grupo.nome}?
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="button" class="btn btn-danger">Sim</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fim Modal excluir Grupo */}
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