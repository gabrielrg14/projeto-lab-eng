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

export default class UserCrud extends Component {

    state = { ...initialState }

    renderTopButtons() {
        return (
            <div className="text-right">
                <button className="btn btn-primary mr-1" data-toggle="modal" data-target="#inserirNovoMaterial">
                    <i className="fa fa-plus mr-3"></i>Novo material
                </button>
                <button className="btn btn-dark ml-1 mr-1" data-toggle="modal" data-target="#inserirNovaCompra">
                    <i class="fa fa-plus mr-3"></i>
                    Nova compra
                </button>
                <button className="btn btn-dark ml-1">
                    Ações
                    <i class="fa fa-caret-down ml-3"></i>
                </button>

                {/*Inicio Modal Novo Material */}
                <div class="modal fade" id="inserirNovoMaterial" tabindex="-1" role="dialog" aria-labelledby="ModalNovoMaterial" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalNovoMaterial">Novo material</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="form">
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>Nome</label>
                                                <input type="text" className="form-control" name="name" placeholder="Nome do material" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>Unidades</label>
                                                <input type="text" className="form-control" name="unidades" placeholder="Unidades do material" />
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
                {/* Fim Modal Novo Material */}

                {/* Início Modal Nova Compra de Material */}
                <div class="modal fade" id="inserirNovaCompra" tabindex="-1" role="dialog" aria-labelledby="ModalNovaCompra" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalNovaCompra">Nova Compra de Material</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="form">
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>Nome do material</label>
                                                <input type="text" className="form-control" name="nome-material-compra" placeholder="Nome do material" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>Unidades</label>
                                                <input type="text" className="form-control" name="unidades" placeholder="Unidades do material" />
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
                {/* Fim Modal Nova Compra de Material */}
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table mt-4">
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
                        <button className="btn btn-warning">
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-1">
                            <i className="fa fa-trash"></i>
                        </button>
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