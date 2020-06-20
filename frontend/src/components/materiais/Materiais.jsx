import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'puzzle-piece',
    title: 'Lista de Materiais',
    subtitle: 'Materiais / Lista'
}

const initialState = {
    materiais: [],
    material: { nome: '', quantidade: '', descricao: '' },
}

export default class Materiais extends Component {

    state = { ...initialState }

    clearStateMaterial(e) {
        e.preventDefault();
        this.setState({ material: initialState.material })
    }

    reloadPage() {
        document.location.reload(false);
    }

    componentWillMount() {
        let componenteAtual = this;
        axios({
            method: 'get',
            url: 'https://projetolabengapi.azurewebsites.net/api/materiais',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            componenteAtual.setState({ materiais: response.data })
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    handleEditMaterial(e, dadosMaterial) {
        var material = { ...this.state.material }
        material = dadosMaterial;
        this.setState({ material });
    }

    handleChangeMaterial(e) {
        const material = { ...this.state.material }
        material[e.target.name] = e.target.value
        this.setState({ material })
        console.log(this.state.material);
        console.log(e.target.name);
        console.log(e.target.value);
    }

    incluirNovoMaterial(e) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'post',
            url: 'https://projetolabengapi.azurewebsites.net/api/materiais',
            data: {
                nome: this.state.material.nome,
                quantidade: this.state.material.quantidade,
                descricao: this.state.material.descricao
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            // console.log(response);
            alert("Material cadastrado com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao cadastrar o material!");
        });
    }

    editarMaterial(e, idMaterial) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'put',
            url: 'https://projetolabengapi.azurewebsites.net/api/materiais/' + idMaterial,
            data: {
                nome: this.state.material.nome,
                quantidade: this.state.material.quantidade,
                descricao: this.state.material.descricao
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            alert("Material editado com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao editar o material!");
        });
    }

    excluirMaterial(e, idMaterial) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'delete',
            url: 'https://projetolabengapi.azurewebsites.net/api/materiais/' + idMaterial,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            alert("Material excluido com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao excluir o material!");
        });
    }

    renderTopButtons() {
        return (
            <div className="text-right">
                <button className="btn btn-primary mr-1" data-toggle="modal" data-target="#inserirNovoMaterial">
                    <i className="fa fa-plus mr-3"></i>Novo material
                </button>
                <button className="btn btn-dark ml-1 mr-1" data-toggle="modal" data-target="#inserirNovaCompra">
                    <i className="fa fa-plus mr-3"></i>
                    Nova compra
                </button>
                <button className="btn btn-dark ml-1">
                    Ações
                    <i className="fa fa-caret-down ml-3"></i>
                </button>

                {/* Inicio Modal Novo Material */}
                <div className="modal fade" id="inserirNovoMaterial" tabIndex="-1" role="dialog" aria-labelledby="ModalNovoMaterial" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalNovoMaterial"><i className="fa fa-plus mr-3"></i> Novo material</h5>
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
                                                <input type="text" className="form-control" name="nome" onChange={e => this.handleChangeMaterial(e)} placeholder="Nome do material" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Quantidade</label>
                                                <input type="text" className="form-control" name="quantidade" onChange={e => this.handleChangeMaterial(e)} placeholder="Quantidade do material" />
                                            </div>
                                        </div>

                                        <div className="col-12 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Descrição</label>
                                                <textarea type="textarea" className="form-control" name="descricao" onChange={e => this.handleChangeMaterial(e)} placeholder="Descrição do material"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => this.clearStateMaterial(e)}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={e => this.incluirNovoMaterial(e)}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Fim Modal Novo Material */}

                {/* Início Modal Nova Compra de Material */}
                <div className="modal fade" id="inserirNovaCompra" tabIndex="-1" role="dialog" aria-labelledby="ModalNovaCompra" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalNovaCompra"><i className="fa fa-plus mr-3"></i> Nova Compra de Material</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form">
                                    <div className="row">
                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Nome do material</label>
                                                <input type="text" className="form-control" name="nome-material-compra" placeholder="Nome do material" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Quantidade</label>
                                                <input type="text" className="form-control" name="quantidade" placeholder="Quantidade do material" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Fornecedor</label>
                                                <input type="text" className="form-control" name="fornecedor" placeholder="Fornecedor do material" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Data da compra</label>
                                                <input type="date" className="form-control" name="data-compra" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 offset-md-3 text-left text-md-center campo-form-modal">
                                            <div className="form-group">
                                                <label>Valor da compra</label>
                                                <input type="text" className="form-control" name="valor-compra" placeholder="R$ 0,00" />
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
                {/* Fim Modal Nova Compra de Material */}
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table table-hover mt-4 text-center">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Descrição</th>
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
                <tr key={material.id}>
                    <td>{material.nome}</td>
                    <td>{material.quantidade}</td>
                    <td>{material.descricao}</td>
                    <td>
                        <button className="btn btn-warning" data-toggle="modal" data-target={"#editarMaterial-" + material.id} onClick={e => this.handleEditMaterial(e, material)}>
                            <i className="fa fa-pencil"></i>
                        </button>

                        {/* Início Modal editar Material */}
                        <div className="modal fade" id={"editarMaterial-" + material.id} tabIndex="-1" role="dialog" aria-labelledby="ModalEditarMaterial" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalEditarMaterial"><i className="fa fa-pencil"></i> Editar material</h5>
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
                                                        <input type="text" className="form-control" name="nome" value={this.state.material.nome} onChange={e => this.handleChangeMaterial(e)} placeholder="Nome do grupo" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                    <div className="form-group">
                                                        <label>Quantidade</label>
                                                        <input type="text" className="form-control" name="quantidade" value={this.state.material.quantidade} onChange={e => this.handleChangeMaterial(e)} placeholder="Quantidade do material" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12 text-left campo-form-modal">
                                                <div className="form-group">
                                                    <label>Descrição</label>
                                                    <textarea type="text" className="form-control" name="descricao" value={this.state.material.descricao} onChange={e => this.handleChangeMaterial(e)} placeholder="Descrição do material"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => this.clearStateMaterial(e)}>Cancelar</button>
                                        <button type="button" className="btn btn-primary" onClick={e => this.editarMaterial(e, material.id)}>Salvar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fim Modal editar Material */}

                        <button className="btn btn-danger ml-1" data-toggle="modal" data-target={"#excluirMaterial-" + material.id}>
                            <i className="fa fa-trash"></i>
                        </button>

                        {/* Início Modal excluir Material */}
                        <div className="modal fade" id={"excluirMaterial-" + material.id} tabIndex="-1" role="dialog" aria-labelledby="ModalExcluirMaterial" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalExcluirMaterial"><i className="fa fa-trash"></i> Excluir material</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Tem certeza que deseja excluir o material {material.nome}?
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="button" className="btn btn-danger" onClick={e => this.excluirMaterial(e, material.id)}>Sim</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fim Modal excluir Material */}
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