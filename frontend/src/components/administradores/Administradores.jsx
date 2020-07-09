import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'suitcase',
    title: 'Lista de Administradores',
    subtitle: 'Administradores / Lista'
}

const initialState = {
    administradores: [],
    administrador: { nome: '', contato: '', email: '', senha: '' }
}

export default class Administradores extends Component {

    state = { ...initialState }

    clearStateAdministrador(e) {
        e.preventDefault();
        this.setState({ administrador: initialState.administrador })
    }

    reloadPage() {
        document.location.reload(false);
    }

    componentWillMount() {
        let componenteAtual = this;
        axios({
            method: 'get',
            url: 'http://localhost:5000/api/admin',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            componenteAtual.setState({ administradores: response.data })
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    handleEditAdministrador(e, dadosAdministrador) {
        var administrador = { ...this.state.administrador }
        administrador = dadosAdministrador;
        this.setState({ administrador });
    }

    handleChangeAdministrador(e) {
        const administrador = { ...this.state.administrador }
        administrador[e.target.name] = e.target.value
        this.setState({ administrador })
        console.log(this.state.administrador);
        console.log(e.target.name);
        console.log(e.target.value);
    }

    incluirNovoAdministrador(e) {
        e.preventDefault();
        let componenteAtual = this;
        if ((!this.state.administrador.nome) || (!this.state.administrador.contato) || 
            (!this.state.administrador.email) || (!this.state.administrador.senha)){
            alert("Campos obrigatórios não preenchidos.")
        }else{
            axios({
                method: 'post',
                url: 'http://localhost:5000/api/admin/register',
                data: {
                    nome: this.state.administrador.nome,
                    email: this.state.administrador.email,
                    contato: this.state.administrador.contato,
                    senha: this.state.administrador.senha
                },
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .then(function(response) {
                // console.log(response);
                alert("Administrador cadastrado com sucesso!");
                componenteAtual.reloadPage();
            })
            .catch(function(error) {
                console.log(error);
                alert("Ocorreu um erro ao cadastrar o Administrador!");
            });
        }
    }

    editarAdministrador(e, idAdministrador) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'put',
            url: 'http://localhost:5000/api/admin/' + idAdministrador,
            data: {
                nome: this.state.administrador.nome,
                email: this.state.administrador.email,
                contato: this.state.administrador.contato,
                senha: this.state.administrador.senha
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            alert("Administrador editado com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao editar o administrador!");
        });
    }

    excluirAdministrador(e, idAdministrador) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'delete',
            url: 'http://localhost:5000/api/admin/' + idAdministrador,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            alert("Administrador excluido com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao excluir o administrador!");
        });
    }

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
                                                <input type="text" className="form-control" name="nome" onChange={e => this.handleChangeAdministrador(e)} placeholder="Nome do administrador" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Contato</label>
                                                <input type="text" className="form-control" name="contato" onChange={e => this.handleChangeAdministrador(e)} placeholder="Contato do administrador" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-8 offset-md-2 text-left text-md-center campo-form-modal">
                                            <div className="form-group">
                                                <label>E-mail</label>
                                                <input type="email" className="form-control" name="email" onChange={e => this.handleChangeAdministrador(e)} placeholder="E-mail do administrador" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-8 offset-md-2 text-left text-md-center campo-form-modal">
                                            <div className="form-group">
                                                <label>Senha</label>
                                                <input type="password" className="form-control" name="senha" onChange={e => this.handleChangeAdministrador(e)} placeholder="Senha do administrador" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-8 text-left">
                                            <p style={{color: "red", fontSize: 15}}>Todo os campos são OBRIGATÓRIOS</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => this.clearStateAdministrador(e)}>Cancelar</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => this.incluirNovoAdministrador(e)}>Salvar</button>
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
                <tr key={administrador.id}>
                    <td>{administrador.nome}</td>
                    <td>{administrador.email}</td>
                    <td>{administrador.contato}</td>
                    <td>
                        <button type="button" className="btn btn-warning" data-toggle="modal" data-target={"#editarAdministrador-" + administrador.id} onClick={e => this.handleEditAdministrador(e, administrador)}>
                            <i className="fa fa-pencil"></i>
                        </button>

                        {/* Início Modal editar Administrador */}
                        <div className="modal fade" id={"editarAdministrador-" + administrador.id} tabIndex="-1" role="dialog" aria-labelledby="ModalEditarAdministrador" aria-hidden="true">
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
                                                        <input type="text" className="form-control" name="nome" value={this.state.administrador.nome} onChange={e => this.handleChangeAdministrador(e)} placeholder="Nome do administrador" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Contato</label>
                                                        <input type="text" className="form-control" name="contato" value={this.state.administrador.contato} onChange={e => this.handleChangeAdministrador(e)} placeholder="Contato do administrador" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-md-8 offset-md-2 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>E-mail</label>
                                                        <input type="email" className="form-control" name="email" value={this.state.administrador.email} onChange={e => this.handleChangeAdministrador(e)} placeholder="E-mail do administrador" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-md-8 offset-md-2 text-left text-md-center campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Senha</label>
                                                        <input type="password" className="form-control" name="senha" value={this.state.administrador.senha} onChange={e => this.handleChangeAdministrador(e)} placeholder="Senha do administrador" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => this.clearStateAdministrador(e)}>Cancelar</button>
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => this.editarAdministrador(e, administrador.id)}>Salvar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fim Modal editar Administrador */}

                        <button type="button" className="btn btn-danger ml-1" data-toggle="modal" data-target={"#excluirAdministrador-" + administrador.id}>
                            <i className="fa fa-trash"></i>
                        </button>

                        {/* Início Modal excluir Administrador */}
                        <div className="modal fade" id={"excluirAdministrador-" + administrador.id} tabIndex="-1" role="dialog" aria-labelledby="ModalExcluirAdministrador" aria-hidden="true">
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
                                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={e => this.excluirAdministrador(e, administrador.id)}>Sim</button>
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