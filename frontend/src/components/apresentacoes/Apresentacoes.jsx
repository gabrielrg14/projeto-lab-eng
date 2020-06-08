import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'eye',
    title: 'Lista de Apresentações',
    subtitle: 'Apresentações / Lista'
}

const initialState = {
    apresentacoes: [
        { data: '11/05/2020', local: 'Fatec Campinas', tempo: '25'},
        { data: '28/08/2020', local: 'Escola Americana', tempo: '15' },
        { data: '16/05/2020', local: 'Jardim Santa Clara', tempo: '20' }
    ],
}

export default class UserCrud extends Component {

    state = { ...initialState }

    renderTopButtons() {
        return (
            <div className="text-right">
                <button type="button" className="btn btn-primary mr-1" data-toggle="modal" data-target="#inserirNovoMembro">
                    <i className="fa fa-plus mr-3"></i>
                    Nova apresentação
                </button>
                <button className="btn btn-dark ml-1">
                    Ações
                    <i class="fa fa-caret-down ml-3"></i>
                </button>

                {/* Início Modal nova Apresentação */}
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
                                        <div className="col-12 col-md-4">
                                            <div className="form-group">
                                                <label>Data</label>
                                                <input type="date" className="form-control" name="data" placeholder="Data da apresentação" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-4">
                                            <div className="form-group">
                                                <label>Local</label>
                                                <input type="text" className="form-control" name="grupo" placeholder="Local da apresentação" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-4">
                                            <div className="form-group">
                                                <label>Tempo</label>
                                                <input type="time" className="form-control" name="tempo" placeholder="Tempo de apresentação" />
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
                {/* Fim Modal nova Apresentação */}
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Local</th>
                        <th>Tempo</th>
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
        return this.state.apresentacoes.map(apresentacoes => {
            return (
                <tr key='1'>
                    <td>{apresentacoes.data}</td>
                    <td>{apresentacoes.local}</td>
                    <td>{apresentacoes.tempo}</td>
                    <td>
                        <button className="btn btn-warning">
                            <i className="fa fa-pencil" data-toggle="modal" data-target="#editarApresentacao"></i>
                        </button>

                        {/* Início Modal editar Apresentação */}
                        <div className="modal fade" id="editarApresentacao" role="dialog" aria-labelledby="ModalEditarApresentacao" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalEditarApresentacao"><i className="fa fa-pencil"></i> Editar musica</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div className="form">
                                            <div className="row">
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <label>Data</label>
                                                        <input type="date" className="form-control" name="data" placeholder="Data da apresentação" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <label>Local</label>
                                                        <input type="text" className="form-control" name="grupo" placeholder="Local da apresentação" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <label>Tempo</label>
                                                        <input type="time" className="form-control" name="tempo" placeholder="Tempo de apresentação" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer" data-toggle="modal" data-target="#editarApresentacao">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="button" className="btn btn-primary">Salvar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fim Modal editar Apresentação */}

                        <button className="btn btn-danger">
                            <i className="fa fa-trash" data-toggle="modal" data-target="#excluirApresentacao"></i>
                        </button>

                        {/* Início Modal excluir Apresentação */}
                        <div className="modal fade" id="excluirApresentacao" role="dialog" aria-labelledby="ModalExcluirApresentacao" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalExcluirApresentacao"><i className="fa fa-archive"></i> Excluir Música </h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Tem certeza que deseja excluir?
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="button" className="btn btn-danger">Sim</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fim Modal excluir Apresentação */}
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