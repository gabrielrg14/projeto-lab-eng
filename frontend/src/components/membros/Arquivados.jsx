import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'user-times',
    title: 'Lista de Membros Arquivados',
    subtitle: 'Membros Arquivados/ Lista'
}

const initialState = {
    membros: []
}

export default class Ativos extends Component {

    state = { ...initialState }

    reloadPage() {
        document.location.reload(false);
    }

    componentWillMount() {
        let componenteAtual = this;

        axios({
            method: 'get',
            url: 'http://localhost:5000/api/membros/desativados',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            componenteAtual.setState({ membros: response.data });
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    ativarMembro(e, idMembro) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'put',
            url: 'http://localhost:5000/api/membros/' + idMembro,
            data: {
                status: "Ativo"
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            alert("Membro ativado com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao ativar o membro!");
        });
    }

    excluirMembro(e, idMembro) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'delete',
            url: 'http://localhost:5000/api/membros/' + idMembro,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            alert("Membro excluido com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao excluir o membro!");
        });
    }

    renderTopButtons() {
        return (
            <div className="text-right">
                <button className="btn btn-dark ml-1">
                    Ações
                    <i className="fa fa-caret-down ml-3"></i>
                </button>
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
                        <th>Status</th>
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
                <tr key={membro.id}>
                    <td>{membro.nome}</td>
                    <td>
                        {membro.grupos.length === 0 ? "Membro sem grupo!" : membro.grupos.map(grupo => {
                            return grupo.nome + ", " 
                        })}
                    </td>
                    <td>{membro.status}</td>
                    <td>
                        <button type="button" className="btn btn-success" data-toggle="modal" data-target={"#reativarMembro-" + membro.id}>
                            <i className="fa fa-undo"></i>
                        </button>

                        {/* Início Modal reativar Membro */}
                        <div className="modal fade" id={"reativarMembro-" + membro.id} role="dialog" aria-labelledby="ModalReativarMembro" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalReativarMembro"><i className="fa fa-undo"></i> Reativar membro</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Deseja mesmo reativar o membro {membro.nome}?
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="button" className="btn btn-success" onClick={e => this.ativarMembro(e, membro.id)}>Sim</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fim Modal reativar Membro */}

                        <button type="button" className="btn btn-danger ml-1" data-toggle="modal" data-target={"#excluirMembro-" + membro.id}>
                            <i className="fa fa-trash"></i>
                        </button>

                        {/* Início Modal excluir Membro */}
                        <div className="modal fade" id={"excluirMembro-" + membro.id} role="dialog" aria-labelledby="ModalExcluirMembro" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalExcluirMembro"><i className="fa fa-trash"></i> Excluir membro</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Tem certeza que deseja excluir permanentemente o membro {membro.nome}?
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="button" className="btn btn-danger" onClick={e => this.excluirMembro(e, membro.id)}>Sim</button>
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