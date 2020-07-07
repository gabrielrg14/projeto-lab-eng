import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Lista de Grupos',
    subtitle: 'Grupos / Lista'
}

const initialState = {
    grupos: [],
    membrosGrupo: [],
    grupo: { nome: '', modalidade: '' }
}

export default class Grupos extends Component {

    state = { ...initialState }

    clearStateGrupo(e) {
        e.preventDefault();
        this.setState({ grupo: initialState.grupo })
    }

    reloadPage() {
        document.location.reload(false);
    }

    componentWillMount() {
        let componenteAtual = this;
        axios({
            method: 'get',
            url: 'http://localhost:5000/api/grupos',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            componenteAtual.setState({ grupos: response.data })
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    handleEditGrupo(e, dadosGrupo) {
        var grupo = { ...this.state.grupo }
        grupo = dadosGrupo;
        this.setState({ grupo });
    }

    handleChangeGrupo(e) {
        const grupo = { ...this.state.grupo }
        grupo[e.target.name] = e.target.value
        this.setState({ grupo })
        console.log(this.state.grupo);
        console.log(e.target.name);
        console.log(e.target.value);
    }

    listarMembrosGrupo(e, idGrupo) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'get',
            url: 'http://localhost:5000/api/grupoMembro/' + idGrupo,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            componenteAtual.setState({ membrosGrupo: response.data })
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao listar os membros do grupo!");
        });
        console.log(this.state.membrosGrupo);
    }

    incluirNovoGrupo(e) {
        e.preventDefault();
        let componenteAtual = this;
        if ((!this.state.grupo.nome) || (!this.state.grupo.modalidade)){
            alert("Campos obrigatórios não preenchidos.")
        }else{
            axios({
                method: 'post',
                url: 'http://localhost:5000/api/grupos',
                data: {
                    nome: this.state.grupo.nome,
                modalidade: this.state.grupo.modalidade
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
            })
        .then(function(response) {
            // console.log(response);
            alert("Grupo cadastrado com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao cadastrar o Grupo!");
        });
        }
    }

    excluirMembroGrupo(e, idGrupo, idMembro) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'delete',
            url: 'http://localhost:5000/api/grupoMembro/' + idGrupo + '/' + idMembro,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            alert("Membro excluido do grupo com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao excluir o membro do grupo!");
        });
    }

    editarGrupo(e, idGrupo) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'put',
            url: 'http://localhost:5000/api/grupos/' + idGrupo,
            data: {
                nome: this.state.grupo.nome,
                modalidade: this.state.grupo.modalidade
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            alert("Grupo editado com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao editar o grupo!");
        });
    }

    excluirGrupo(e, idGrupo) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'delete',
            url: 'http://localhost:5000/api/grupos/' + idGrupo,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            alert("Grupo excluido com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao excluir o grupo!");
        });
    }

    renderTopButtons() {
        return (
            <div className="text-right">
                <button type="button" className="btn btn-primary mr-1" data-toggle="modal" data-target="#inserirNovoGrupo">
                    <i className="fa fa-plus mr-3"></i>
                    Novo grupo
                </button>
                <button className="btn btn-dark ml-1">
                    Ações
                    <i className="fa fa-caret-down ml-3"></i>
                </button>

                {/* Início Modal novo Grupo */}
                <div className="modal fade" id="inserirNovoGrupo" tabIndex="-1" role="dialog" aria-labelledby="ModalNovoGrupo" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalNovoGrupo"><i className="fa fa-plus mr-3"></i> Novo grupo</h5>
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
                                                <input type="text" className="form-control" name="nome" onChange={e => this.handleChangeGrupo(e)} placeholder="Nome do grupo" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Modalidade</label>
                                                <input type="text" className="form-control" name="modalidade" onChange={e => this.handleChangeGrupo(e)} placeholder="Modalidade do grupo" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-8 text-left">
                                            <p style={{color: "red", fontSize: 15}}>Todo os campos são OBRIGATÓRIO</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => this.clearStateGrupo(e)}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={e => this.incluirNovoGrupo(e)}>Salvar</button>
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
            <table className="table table-hover mt-4 text-center">
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
                <tr key={grupo.id}>
                    <td>{grupo.nome}</td>
                    <td>{grupo.modalidade}</td>
                    <td>
                        <button type="button" className="btn btn-warning" data-toggle="modal" data-target={"#editarGrupo" + grupo.id} onClick={e => this.handleEditGrupo(e, grupo)}>
                            <i className="fa fa-pencil"></i>
                        </button>

                        {/* Início Modal editar Grupo */}
                        <div className="modal fade" id={"editarGrupo" + grupo.id} tabIndex="-1" role="dialog" aria-labelledby="ModalEditarGrupo" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalEditarGrupo"><i className="fa fa-pencil"></i> Editar Grupo</h5>
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
                                                        <input type="text" className="form-control" name="nome" value={this.state.grupo.nome} onChange={e => this.handleChangeGrupo(e)} placeholder="Nome do grupo" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Modalidade</label>
                                                        <input type="text" className="form-control" name="modalidade" value={this.state.grupo.modalidade} onChange={e => this.handleChangeGrupo(e)} placeholder="Modalidade do grupo" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => this.clearStateGrupo(e)}>Cancelar</button>
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => this.editarGrupo(e, grupo.id)}>Salvar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fim Modal editar Grupo */}

                        <button type="button" className="btn btn-danger ml-1" data-toggle="modal" data-target={"#excluirGrupo" + grupo.id}>
                            <i className="fa fa-trash"></i>
                        </button>

                        {/* Início Modal excluir Grupo */}
                        <div className="modal fade" id={"excluirGrupo" + grupo.id} tabIndex="-1" role="dialog" aria-labelledby="ModalExcluirGrupo" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalExcluirGrupo"><i className="fa fa-trash"></i> Excluir grupo</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <b>Esta é uma ação irreversível!<br/> 
                                        Todos os membros serão removidos deste grupo!</b><br/><br/>
                                        Tem certeza que deseja excluir o grupo {grupo.nome}?
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={e => this.excluirGrupo(e, grupo.id)}>Sim</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fim Modal excluir Grupo */}

                        <button type="button" className="btn btn-info ml-1" data-toggle="modal" data-target={"#listarMembrosGrupo-" + grupo.id} onClick={e => this.listarMembrosGrupo(e, grupo.id)}>
                            <i className="fa fa-users"></i>
                        </button>

                        {/* Início Modal listar Membros do Grupo */}
                        <div className="modal fade" id={"listarMembrosGrupo-" + grupo.id} tabIndex="-1" role="dialog" aria-labelledby="ModalListarMembros" aria-hidden="true">
                            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalListarMembros"><i className="fa fa-users"></i> Lista de Membros</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <table className="table table-hover mt-4 text-center">
                                            <thead>
                                                <tr>
                                                    <th>Nome</th>
                                                    <th>Status</th>
                                                    <th>Ações</th>
                                                </tr>
                                            </thead>
                                        
                                            <tbody>
                                                {this.state.membrosGrupo.map(membro => {
                                                    return (
                                                        <tr key={membro.id}>
                                                            <td>{membro.nome}</td>
                                                            <td>{membro.status}</td>
                                                            <td>
                                                                <button type="button" className="btn btn-danger ml-1" data-toggle="modal" data-target={"#excluirMembroGrupo-" + membro.id + "-" + grupo.id}>
                                                                    <i className="fa fa-trash"></i>
                                                                </button>

                                                                {/* Início Modal excluir Membro do Grupo */}
                                                                <div className="modal fade" style={{zIndex: 1}} id={"excluirMembroGrupo-" + membro.id + "-" + grupo.id} tabIndex="-1" role="dialog" aria-labelledby="ModalExcluirMembroGrupo" aria-hidden="true">
                                                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title" id="ModalExcluirMembroGrupo"><i className="fa fa-trash"></i> Excluir Membro do Grupo</h5>
                                                                                <button type="button" className="close" data-toggle="modal" data-target={"#excluirMembroGrupo-" + membro.id + "-" + grupo.id} aria-label="Fechar">
                                                                                    <span aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                Tem certeza que deseja excluir o membro {membro.nome} do grupo {grupo.nome}?
                                                                            </div>

                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-secondary" data-toggle="modal" data-target={"#excluirMembroGrupo-" + membro.id + "-" + grupo.id}>Cancelar</button>
                                                                                <button type="button" className="btn btn-danger" onClick={e => this.excluirMembroGrupo(e, grupo.id, membro.id)}>Sim</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* Fim Modal excluir Membro do Grupo */}
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" data-dismiss="modal">Fechar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fim Modal listar Membros do Grupo */}
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