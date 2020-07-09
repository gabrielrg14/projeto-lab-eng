import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'play',
    title: 'Lista de Músicas',
    subtitle: 'Músicas / Lista'
}

const initialState = {
    musicas: [],
    grupos: [],
    musica: { nome: '', descricao: '', tempo: '', qtdInstrumentos: '', grupoId: ''}
}

export default class UserCrud extends Component {

    state = { ...initialState }

    clearStateMusica(e) {
        e.preventDefault();
        this.setState({ musica: initialState.musica })
    }

    reloadPage() {
        document.location.reload(false);
    }

    // Requisição backend para listar músicas
    componentWillMount() {
        let componenteAtual = this;

        axios({
            method: 'get',
            url: 'http://localhost:5000/api/musicas',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            componenteAtual.setState({ musicas: response.data });
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

    handleEditMusica(e, dadosMusica) {
        var musica = { ...this.state.musica }
        musica = dadosMusica;
        this.setState({ musica });
    }

    handleChangeMusica(e) {
        const musica = { ...this.state.musica }
        musica[e.target.name] = e.target.value;
        this.setState({ musica });
        console.log(this.state.musica);
        console.log(e.target.name);
        console.log(e.target.value);
    }

    incluirNovaMusica(e) {
        e.preventDefault();
        let componenteAtual = this;
        console.log(this.state.musica);
        if ((!this.state.musica.nome) || (!this.state.musica.descricao) || 
            (!this.state.musica.tempo) || (!this.state.musica.qtdInstrumentos) ||
            (!this.state.musica.grupoId)) {
            alert("Campos obrigatórios não preenchidos.");
        }else{
            axios({
                method: 'post',
                url: 'http://localhost:5000/api/musicas',
                data: {
                    nome: this.state.musica.nome,
                    descricao: this.state.musica.descricao,
                    tempo: this.state.musica.tempo,
                    qtdInstrumentos: this.state.musica.qtdInstrumentos,
                    grupoId: this.state.musica.grupoId
                },
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .then(function(response) {
                // console.log(response);
                alert("Música cadastrada com sucesso!");
                componenteAtual.reloadPage();
            })
            .catch(function(error) {
                console.log(error);
                alert("Ocorreu um erro ao cadastrar a música!");
            });
        }   
    }

    editarMusica(e, idMusica) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'put',
            url: 'http://localhost:5000/api/musicas/' + idMusica,
            data: {
                nome: this.state.musica.nome,
                descricao: this.state.musica.descricao,
                tempo: this.state.musica.tempo,
                qtdInstrumentos: this.state.musica.qtdInstrumentos,
                grupoId: this.state.musica.grupoId
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            alert("Música editada com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao editar a música!");
        });
    }

    excluirMusica(e, idMusica) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'delete',
            url: 'http://localhost:5000/api/musicas/' + idMusica,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            alert("Música excluída com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao excluir a música!");
        });
    }

    renderTopButtons() {
        return (
            <div className="text-right">
                <button type="button" className="btn btn-primary mr-1" data-toggle="modal" data-target="#inserirNovoMembro">
                    <i className="fa fa-plus mr-3"></i>
                    Nova música
                </button>
                <button className="btn btn-dark ml-1">
                    Ações
                    <i className="fa fa-caret-down ml-3"></i>
                </button>

                {/* Início Modal nova Música */}
                <div className="modal fade" id="inserirNovoMembro" tabindex="-1" role="dialog" aria-labelledby="ModalNovoMembro" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalNovoMembro"><i className="fa fa-plus mr-3"></i> Nova música</h5>
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
                                                <input type="text" className="form-control" name="nome" onChange={e => this.handleChangeMusica(e)} placeholder="Nome da música" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Grupo</label>
                                                <select className="form-control" name="grupoId" onChange={e => this.handleChangeMusica(e)}>
                                                    <option value="" selected disabled>Selecione...</option>
                                                    {this.listarGrupos()}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Quant. de Instrumentos</label>
                                                <input type="number" className="form-control" name="qtdInstrumentos" onChange={e => this.handleChangeMusica(e)} placeholder="Quantidade de instrumentos" min="1" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Duração</label>
                                                <input type="time" step="1" className="form-control" name="tempo" onChange={e => this.handleChangeMusica(e)} placeholder="Tempo de duração" />
                                            </div>
                                        </div>

                                        <div className="col-12 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Descrição</label>
                                                <textarea type="textarea" className="form-control" name="descricao" onChange={e => this.handleChangeMusica(e)} placeholder="Descrição da música"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-8 text-left">
                                            <p style={{color: "red", fontSize: 15}}>Todos os campos são OBRIGATÓRIOS</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => this.clearStateMusica(e)}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={e => this.incluirNovaMusica(e)}>Salvar</button>
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
                        <th>Descrição</th>
                        <th>Grupo</th>
                        <th>Duração</th>
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
        return this.state.musicas.map(musica => {
            return (
                <tr key={musica.id}>
                    <td>{musica.nome}</td>
                    <td>{musica.descricao}</td>
                    <td>{musica.grupo}</td>
                    <td>{musica.tempo}</td>
                    <td>
                        <button className="btn btn-warning" data-toggle="modal" data-target={"#editarMusica-" + musica.id} onClick={e => this.handleEditMusica(e, musica)}>
                            <i className="fa fa-pencil"></i>
                        </button>

                        {/* Início Modal editar Música */}
                        <div className="modal fade" id={"editarMusica-" + musica.id} role="dialog" aria-labelledby="ModalEditarMusica" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalEditarMusica"><i className="fa fa-pencil"></i> Editar música</h5>
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
                                                        <input type="text" className="form-control" name="nome" value={this.state.musica.nome} onChange={e => this.handleChangeMusica(e)} placeholder="Nome da música" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Grupo</label>
                                                        <select className="form-control" name="grupoId" onChange={e => this.handleChangeMusica(e)}>
                                                            <option value="" selected disabled>{musica.grupo}</option>
                                                            {this.listarGrupos()}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Quant. de Instrumentos</label>
                                                        <input type="number" className="form-control" name="qtdInstrumentos" value={this.state.musica.qtdInstrumentos} onChange={e => this.handleChangeMusica(e)} placeholder="Quantidade de instrumentos" min="1" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Duração</label>
                                                        <input type="time" step="1" className="form-control" name="tempo" value={this.state.musica.tempo} onChange={e => this.handleChangeMusica(e)} placeholder="Tempo de duração" />
                                                    </div>
                                                </div>

                                                <div className="col-12 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Descrição</label>
                                                        <textarea type="text" className="form-control" name="descricao" value={this.state.musica.descricao} onChange={e => this.handleChangeMusica(e)} placeholder="Descrição da música"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => this.clearStateMusica(e)}>Cancelar</button>
                                        <button type="button" className="btn btn-primary" onClick={e => this.editarMusica(e, musica.id)}>Salvar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fim Modal editar Membro */}

                        <button className="btn btn-danger ml-1" data-toggle="modal" data-target={"#excluirMusica" + musica.id}>
                            <i className="fa fa-trash"></i>
                        </button>

                        {/* Início Modal excluir Membro */}
                        <div className="modal fade" id={"excluirMusica" + musica.id} role="dialog" aria-labelledby="ModalExcluirMusica" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalExcluirMusica"><i className="fa fa-trash"></i> Excluir Música</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Tem certeza que deseja excluir {musica.nome}?
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="button" className="btn btn-danger" onClick={e => this.excluirMusica(e, musica.id)}>Sim</button>
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

    // renderTable2() {
    //     return (
    //         <table className="table table-hover mt-4 text-center">
    //             <thead>
    //                 <tr>
    //                     <th>Formação</th>
    //                     <th>Quantidade</th>
    //                     <th>Duração</th>
    //                     <th>Ações</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {this.renderRows()}
    //             </tbody>
    //         </table>
    //     )
    // }

    // renderRows2() {
    //     return this.state.musicas.map(musicas => {
    //         return (
    //             <tr key='1'>
    //                 <td>{musicas.formacao}</td>
    //                 <td>{musicas.quantidade}</td>
    //                 <td>{musicas.tempo}</td>
    //                 <td>
    //                     <button className="btn btn-warning" data-toggle="modal" data-target="#editarMusica">
    //                         <i className="fa fa-pencil"></i>
    //                     </button>

    //                     {/* Início Modal editar Música */}
    //                     <div className="modal fade" id="editarMusica" role="dialog" aria-labelledby="ModalEditarMusica" aria-hidden="true">
    //                             <div className="modal-dialog modal-dialog-centered" role="document">
    //                                 <div className="modal-content">
    //                                     <div className="modal-header">
    //                                         <h5 className="modal-title" id="ModalEditarMusica"><i className="fa fa-pencil"></i> Editar musica</h5>
    //                                         <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
    //                                             <span aria-hidden="true">&times;</span>
    //                                         </button>
    //                                     </div>
    //                                     <div className="modal-body">
    //                                         <div className="form">
    //                                             <div className="row">
    //                                                 <div className="col-12 col-md-6">
    //                                                     <div className="form-group">
    //                                                         <label>Nome</label>
    //                                                         <input type="text" className="form-control" name="nome" placeholder="Nome da música" />
    //                                                     </div>
    //                                                 </div>

    //                                                 <div className="col-12 col-md-6">
    //                                                     <div className="form-group">
    //                                                         <label>Grupo</label>
    //                                                         <input type="text" className="form-control" name="grupo" placeholder="Nome do grupo" />
    //                                                     </div>
    //                                                 </div>

    //                                                 <div className="col-12 col-md-6">
    //                                                     <div className="form-group">
    //                                                         <label>Descrição</label>
    //                                                         <input type="text" className="form-control" name="descricao" placeholder="Descrição da música" />
    //                                                     </div>
    //                                                 </div>

    //                                                 <div className="col-12 col-md-6">
    //                                                     <div className="form-group">
    //                                                         <label>Formação</label>
    //                                                         <input type="text" className="form-control" name="formacao" placeholder="Formação" />
    //                                                     </div>
    //                                                 </div>

    //                                                 <div className="col-12 col-md-6">
    //                                                     <div className="form-group">
    //                                                         <label>Quant. de Instrumentos</label>
    //                                                         <input type="number" className="form-control" name="quantidade" placeholder="Quantidade de instrumentos" min="1" />
    //                                                     </div>
    //                                                 </div>

    //                                                 <div className="col-12 col-md-6">
    //                                                     <div className="form-group">
    //                                                         <label>Duração</label>
    //                                                         <input type="time" step="1" className="form-control" name="tempo" placeholder="Tempo de duração" />
    //                                                     </div>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                     </div>

    //                                     <div className="modal-footer">
    //                                         <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
    //                                         <button type="button" className="btn btn-primary">Salvar</button>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         {/* Fim Modal editar Membro */}

    //                     <button className="btn btn-danger ml-1" data-toggle="modal" data-target="#excluirMusica">
    //                         <i className="fa fa-trash"></i>
    //                     </button>

    //                     {/* Início Modal excluir Membro */}
    //                     <div className="modal fade" id="excluirMusica" role="dialog" aria-labelledby="ModalExcluirMusica" aria-hidden="true">
    //                         <div className="modal-dialog modal-dialog-centered" role="document">
    //                             <div className="modal-content">
    //                                 <div className="modal-header">
    //                                     <h5 className="modal-title" id="ModalExcluirMusica"><i className="fa fa-archive"></i> Excluir Música </h5>
    //                                     <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
    //                                         <span aria-hidden="true">&times;</span>
    //                                     </button>
    //                                 </div>
    //                                 <div className="modal-body">
    //                                     Tem certeza que deseja excluir {musicas.nome}?
    //                                 </div>

    //                                 <div className="modal-footer">
    //                                     <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
    //                                     <button type="button" className="btn btn-danger">Sim</button>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     {/* Fim Modal excluir Membro */}
    //                 </td>
    //             </tr>
    //         )
    //     });
    // }

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
                {/* {this.renderTable2()} */}
                {this.renderBottomButtons()}
            </Main>
        )
    }
}