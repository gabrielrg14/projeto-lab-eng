import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'play',
    title: 'Lista de Músicas',
    subtitle: 'Músicas / Lista'
}

const initialState = {
    musicas: [
        { nome: 'Música 1', grupo: 'Grupo X', descricao: 'Descrição...', formacao:'Formação 1', quantidade:'12', tempo: '5'},
        { nome: 'Música 2', grupo: 'Grupo Y', descricao: 'Descrição...', formacao:'Formação 2', quantidade:'12', tempo: '6'},
        { nome: 'Música 3', grupo: 'Grupo Z', descricao: 'Descrição...', formacao:'Formação 3', quantidade:'12', tempo: '3'}
    ],
}

export default class UserCrud extends Component {

    state = { ...initialState }

    renderTopButtons() {
        return (
            <div className="text-right">
                <button type="button" className="btn btn-primary mr-1" data-toggle="modal" data-target="#inserirNovoMembro">
                    <i className="fa fa-plus mr-3"></i>
                    Nova música
                </button>
                <button className="btn btn-dark ml-1">
                    Ações
                    <i class="fa fa-caret-down ml-3"></i>
                </button>

                {/* Início Modal nova Música */}
                <div class="modal fade" id="inserirNovoMembro" tabindex="-1" role="dialog" aria-labelledby="ModalNovoMembro" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalNovoMembro">Nova música</h5>
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
                                                <input type="text" className="form-control" name="nome" placeholder="Nome da música" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>Grupo</label>
                                                <input type="text" className="form-control" name="grupo" placeholder="Nome do grupo" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>Descrição</label>
                                                <input type="text" className="form-control" name="descricao" placeholder="Descrição da música" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>Formação</label>
                                                <input type="text" className="form-control" name="formacao" placeholder="Formação" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>Quantidade de Instrumentos</label>
                                                <input type="number" className="form-control" name="quantidade" placeholder="Quantidade de instrumentos" min="1" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>Duração</label>
                                                <input type="time" className="form-control" name="tempo" placeholder="Tempo de duração" />
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
                {/* Fim Modal nova Música */}
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
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderTable2() {
        return (
            <table className="table table-hover mt-4 text-center">
                <thead>
                    <tr>
                        <th>Formação</th>
                        <th>Quantidade</th>
                        <th>Duração</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows2()}
                </tbody>
            </table>
        )
    }
    

    renderRows() {
        return this.state.musicas.map(musicas => {
            return (
                <tr key='1'>
                    <td>{musicas.nome}</td>
                    <td>{musicas.grupo}</td>
                    <td>{musicas.descricao}</td>
                </tr>
            )
        });
    }

    renderRows2() {
        return this.state.musicas.map(musicas => {
            return (
                <tr key='1'>
                    <td>{musicas.formacao}</td>
                    <td>{musicas.quantidade}</td>
                    <td>{musicas.tempo}</td>
                    <td>
                        <button className="btn btn-warning" data-toggle="modal" data-target="#editarMusica">
                            <i className="fa fa-pencil"></i>
                        </button>

                        {/* Início Modal editar Música */}
                        <div className="modal fade" id="editarMusica" role="dialog" aria-labelledby="ModalEditarMusica" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="ModalEditarMusica"><i className="fa fa-pencil"></i> Editar musica</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form">
                                                <div className="row">
                                                    <div className="col-12 col-md-6">
                                                        <div className="form-group">
                                                            <label>Nome</label>
                                                            <input type="text" className="form-control" name="nome" placeholder="Nome da música" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-md-6">
                                                        <div className="form-group">
                                                            <label>Grupo</label>
                                                            <input type="text" className="form-control" name="grupo" placeholder="Nome do grupo" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-md-6">
                                                        <div className="form-group">
                                                            <label>Descrição</label>
                                                            <input type="text" className="form-control" name="descricao" placeholder="Descrição da música" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-md-6">
                                                        <div className="form-group">
                                                            <label>Formação</label>
                                                            <input type="text" className="form-control" name="formacao" placeholder="Formação" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-md-6">
                                                        <div className="form-group">
                                                            <label>Quantidade de Instrumentos</label>
                                                            <input type="number" className="form-control" name="quantidade" placeholder="Quantidade de instrumentos" min="1" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-md-6">
                                                        <div className="form-group">
                                                            <label>Duração</label>
                                                            <input type="time" className="form-control" name="tempo" placeholder="Tempo de duração" />
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

                        <button className="btn btn-danger ml-1" data-toggle="modal" data-target="#excluirMusica">
                            <i className="fa fa-trash"></i>
                        </button>

                        {/* Início Modal excluir Membro */}
                        <div className="modal fade" id="excluirMusica" role="dialog" aria-labelledby="ModalExcluirMusica" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalExcluirMusica"><i className="fa fa-archive"></i> Excluir Música </h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Tem certeza que deseja excluir {musicas.nome}?
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
                {this.renderTable2()}
                {this.renderBottomButtons()}
            </Main>
        )
    }
}