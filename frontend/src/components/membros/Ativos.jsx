import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'user',
    title: 'Lista de Membros Ativos',
    subtitle: 'Membros Ativos/ Lista'
}

const initialState = {
    membros: [
        { nome: 'Rodrigo', grupo: 'Grupo X', mensalidade: 'Em dia', status: 'Ativo', ultima_mensalidade: '2017-10-31 23:12:00' },
        { nome: 'Gabriel', grupo: 'Grupo Y', mensalidade: 'Pendente', status: 'Desativado', ultima_mensalidade: '2017-10-31 24:15:00' },
        { nome: 'Felipe', grupo: 'Grupo Z', mensalidade: 'Atrasada', status: 'Desativado', ultima_mensalidade: '2017-10-31 24:27:02' }
    ],
}

export default class Ativos extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios({
            method: 'get',
            url: 'https://projetolabengapi.azurewebsites.net/api/membros',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    renderTopButtons() {
        return (
            <div className="text-right">
                <button type="button" className="btn btn-primary mr-1" data-toggle="modal" data-target="#inserirNovoMembro">
                    <i className="fa fa-plus mr-3"></i>
                    Novo membro
                </button>
                <button className="btn btn-dark ml-1">
                    Ações
                    <i className="fa fa-caret-down ml-3"></i>
                </button>

                {/* Início Modal novo Membro */}
                <div className="modal fade" id="inserirNovoMembro" role="dialog" aria-labelledby="ModalNovoMembro" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalNovoMembro"><i className="fa fa-plus mr-3"></i> Novo membro</h5>
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
                                                <input type="text" className="form-control" name="name" placeholder="Nome do membro" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>CPF</label>
                                                <input type="text" className="form-control" name="cpf" placeholder="CPF do membro" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Celular</label>
                                                <input type="text" className="form-control" name="celular" placeholder="Celular do membro" />
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
                                        <div className="col-12 col-md-6 offset-md-3 text-left text-md-center campo-form-modal">
                                            <div className="form-group">
                                                <label htmlFor="status">Grupo</label>
                                                <select className="form-control" id="status">
                                                    <option value="" selected disabled>Selecione...</option>
                                                    <option value="grupo-x">Grupo X</option>
                                                    <option value="grupo-y">Grupo Y</option>
                                                    <option value="grupo-z">Grupo Z</option>
                                                </select>
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
                {/* Fim Modal novo Membro */}
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table table-hover mt-4 text-center">
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
        return this.state.membros.map(membro => {
            return (
                <tr>
                    <td>{membro.nome}</td>
                    <td>{membro.grupo}</td>
                    <td>{membro.mensalidade}</td>
                    <td>{membro.status}</td>
                    <td>{membro.ultima_mensalidade}</td>
                    <td>
                        <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#editarMembro">
                            <i className="fa fa-pencil"></i>
                        </button>

                        {/* Início Modal editar Membro */}
                        <div className="modal fade" id="editarMembro" role="dialog" aria-labelledby="ModalEditarMembro" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalEditarMembro"><i className="fa fa-pencil"></i> Editar membro</h5>
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
                                                        <input type="text" className="form-control" name="name" value={membro.nome} placeholder="Nome do membro" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>CPF</label>
                                                        <input type="text" className="form-control" name="cpf" placeholder="CPF do membro" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Celular</label>
                                                        <input type="text" className="form-control" name="celular" placeholder="Celular do membro" />
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
                                                            <option value="" selected disabled>Selecione...</option>
                                                            <option value="grupo-x">Grupo X</option>
                                                            <option value="grupo-x">Grupo Y</option>
                                                            <option value="grupo-x">Grupo Z</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 campo-form-modal">
                                                    <div className="form-group">
                                                        <label htmlFor="status">Status</label>
                                                        <select className="form-control" id="status">
                                                            <option value="" selected disabled>Selecione...</option>
                                                            <option value="ativado">Ativado</option>
                                                            <option value="desativado">Desativado</option>
                                                        </select>
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
                        {/* Fim Modal editar Membro */}

                        <button type="button" className="btn btn-danger ml-1" data-toggle="modal" data-target="#arquivarMembro">
                            <i className="fa fa-archive"></i>
                        </button>

                        {/* Início Modal excluir Membro */}
                        <div className="modal fade" id="arquivarMembro" role="dialog" aria-labelledby="ModalArquivarMembro" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalArquivarMembro"><i className="fa fa-archive"></i> Arquivar membro</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Tem certeza que deseja arquivar o membro {membro.nome}?
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="button" className="btn btn-danger">Sim</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fim Modal excluir Membro */}
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