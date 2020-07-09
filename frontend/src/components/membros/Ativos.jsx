import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'user',
    title: 'Lista de Membros Ativos',
    subtitle: 'Membros Ativos/ Lista'
}

const initialState = {
    membros: [],
    grupos: [],
    membro: { nome: '', cpf: '', contato: '', data_nascimento: '', nome_responsavel: '', conta_responsavel: '', status: '', grupo: '' }
}

export default class Ativos extends Component {

    state = { ...initialState }
    
    clearStateMembro(e) {
        e.preventDefault();
        this.setState({ membro: initialState.membro })
    }

    reloadPage() {
        document.location.reload(false);
    }

    componentWillMount() {
        let componenteAtual = this;

        // Requisição backend para listar membros
        axios({
            method: 'get',
            url: 'http://localhost:5000/api/membros',
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
        
        // Requisição backend para listar grupos
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
    
    listarGrupos() {
        return (
            this.state.grupos.map(grupo => {
                return (
                    <React.Fragment>
                        <option value={grupo.id}>{grupo.nome}</option>
                    </React.Fragment>
                )
            })
        )
    }
    
    handleEditMembro(e, dadosMembro) {
        var membro = { ...this.state.membro }
        membro = dadosMembro;
        this.setState({ membro });
    }
    
    handleChangeMembro(e) {
        const membro = { ...this.state.membro }
        membro[e.target.name] = e.target.value;
        this.setState({ membro });
        console.log(this.state.membro);
        console.log(this.state.membro.grupo);
        console.log(e.target.name);
        console.log(e.target.value);
    }

    incluirNovoMembro(e) {
        e.preventDefault();
        let componenteAtual = this;
        console.log(this.state.membro);
        if ((!this.state.membro.nome) || (!this.state.membro.cpf) || 
            (!this.state.membro.contato) || (!this.state.membro.data_nascimento)){
            alert("Campos obrigatórios não preenchidos.")
        }
        else{
            axios({
                method: 'post',
                url: 'http://localhost:5000/api/membros',
                data: {
                    nome: this.state.membro.nome,
                    contato: this.state.membro.contato,
                    nome_responsavel: this.state.membro.nome_responsavel,
                    conta_responsavel: this.state.membro.conta_responsavel,
                    cpf: this.state.membro.cpf,
                    data_nascimento: this.state.membro.data_nascimento
                },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
            })
        .then(function(response) {
            // console.log(response);
            alert("Membro cadastrado com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao cadastrar o membro!");
            });
        }   
    }
    
    editarMembro(e, idMembro) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'put',
            url: 'http://localhost:5000/api/membros/' + idMembro,
            data: {
                nome: this.state.membro.nome,
                contato: this.state.membro.contato,
                nome_responsavel: this.state.membro.nome_responsavel,
                conta_responsavel: this.state.membro.conta_responsavel,
                cpf: this.state.membro.cpf,
                data_nascimento: this.state.membro.data_nascimento,
                status: this.state.membro.status
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            alert("Membro editado com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao editar o membro!");
        });

        // Se não selecionou o campo grupo membro, não faz a requisição
        if(this.state.membro.grupo !== undefined) {
            axios({
                method: 'post',
                url: 'http://localhost:5000/api/grupoMembro/' + this.state.membro.grupo + "/" + idMembro,
                data: {
                    nome: this.state.membro.nome,
                    contato: this.state.membro.contato,
                    nome_responsavel: this.state.membro.nome_responsavel,
                    conta_responsavel: this.state.membro.conta_responsavel,
                    cpf: this.state.membro.cpf,
                    data_nascimento: this.state.membro.data_nascimento,
                    status: this.state.membro.status
                },
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .then(function(response) {
                console.log(response);
                alert("Membro incluido no grupo com sucesso!");
                componenteAtual.reloadPage();
            })
            .catch(function(error) {
                console.log(error);
                alert("Ocorreu um erro ao incluir o membro no grupo!");
            });
        }
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
            alert("Membro arquivado com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao arquivar o membro!");
        });
    }

    verificaStatusMembro(status) {
        if(status === 'Ativo') {
            return (
                <select className="form-control" name="status" onChange={e => this.handleChangeMembro(e)}>
                    <option value={status} selected>{status}</option>
                    <option value="Desativado">Desativado</option>
                </select>
            )
        } else {
            return (
                <select className="form-control" name="status" onChange={e => this.handleChangeMembro(e)}>
                    <option value={status} selected>{status}</option>
                    <option value="Ativo">Ativo</option>
                </select>
            )
        }
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
                                <div className="form" onClick={this.onClick} noValidate>
                                    <div className="row">
                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Nome*</label>
                                                <input type="text" className="form-control" name="nome" onChange={e => this.handleChangeMembro(e)} placeholder="Nome do membro" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>CPF*</label>
                                                <input type="text" className="form-control" name="cpf" onChange={e => this.handleChangeMembro(e)} placeholder="CPF do membro" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Celular*</label>
                                                <input type="text" className="form-control" name="contato" onChange={e => this.handleChangeMembro(e)} placeholder="Celular do membro" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Data de Nascimento*</label>
                                                <input type="date" className="form-control" name="data_nascimento" onChange={e => this.handleChangeMembro(e)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label >Nome do Responsável</label>
                                                <input type="text" className="form-control" name="nome_responsavel" onChange={e => this.handleChangeMembro(e)} placeholder="Nome do responsável" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Celular do Responsável</label>
                                                <input type="text" className="form-control" name="conta_responsavel" onChange={e => this.handleChangeMembro(e)} placeholder="Celular do responsável" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-8 text-left">
                                            <p style={{color: "red", fontSize: 15}}>(*)Campo OBRIGATÓRIOS</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => this.clearStateMembro(e)}>Cancelar</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => this.incluirNovoMembro(e)}>Salvar</button>
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
                        <th>Grupo(s)</th>
                        {/* <th>Mensalidade</th> */}
                        <th>Status</th>
                        {/* <th>Última mensalidade</th> */}
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
                    {/* <td>{membro.mensalidade}</td> */}
                    <td>{membro.status}</td>
                    <td>
                        <button type="button" className="btn btn-warning" data-toggle="modal" data-target={"#editarMembro-" + membro.id} onClick={e => this.handleEditMembro(e, membro)}>
                            <i className="fa fa-pencil"></i>
                        </button>

                        {/* Início Modal editar Membro */}
                        <div className="modal fade" id={"editarMembro-" + membro.id} role="dialog" aria-labelledby="ModalEditarMembro" aria-hidden="true">
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
                                                        <input type="text" className="form-control" name="nome" value={this.state.membro.nome} onChange={e => this.handleChangeMembro(e)} placeholder="Nome do membro" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>CPF</label>
                                                        <input type="text" className="form-control" name="cpf" value={this.state.membro.cpf} onChange={e => this.handleChangeMembro(e)} placeholder="CPF do membro" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Celular</label>
                                                        <input type="text" className="form-control" name="contato" value={this.state.membro.contato} onChange={e => this.handleChangeMembro(e)} placeholder="Celular do membro" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Data de Nascimento</label>
                                                        <input type="date" className="form-control" value={this.state.membro.data_nascimento} onChange={e => this.handleChangeMembro(e)} name="data_nascimento" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label >Nome do Responsável</label>
                                                        <input type="text" className="form-control" name="nome_responsavel" value={this.state.membro.nome_responsavel} onChange={e => this.handleChangeMembro(e)} placeholder="Nome do responsável" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Celular do Responsável</label>
                                                        <input /*mask={['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}*/
                                                        type="text" className="form-control" name="conta_responsavel" value={this.state.membro.conta_responsavel} onChange={e => this.handleChangeMembro(e)} placeholder="Celular do responsável" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Grupo</label>
                                                        <select className="form-control" name="grupo" onChange={e => this.handleChangeMembro(e)}>
                                                            <option value="" selected disabled>Selecione...</option>
                                                            {this.listarGrupos()}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label htmlFor="status">Status</label>
                                                        {this.verificaStatusMembro(membro.status)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => this.clearStateMembro(e)}>Cancelar</button>
                                        <button type="button" className="btn btn-primary" onClick={e => this.editarMembro(e, membro.id)}>Salvar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fim Modal editar Membro */}

                        <button type="button" className="btn btn-danger ml-1" data-toggle="modal" data-target={"#arquivarMembro-" + membro.id}>
                            <i className="fa fa-archive"></i>
                        </button>

                        {/* Início Modal excluir Membro */}
                        <div className="modal fade" id={"arquivarMembro-" + membro.id} role="dialog" aria-labelledby="ModalArquivarMembro" aria-hidden="true">
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
                                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={e => this.excluirMembro(e, membro.id)}>Sim</button>
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