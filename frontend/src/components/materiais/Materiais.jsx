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
    administradores: [],
    compras: [],
    compra: { admin_id: '', material_id: '', fornecedor: '', valor: '', quantidade: '', data: '' },
    comprasMaterial: []
}

export default class Materiais extends Component {

    state = { ...initialState }

    clearStateMaterial(e) {
        e.preventDefault();
        this.setState({ material: initialState.material })
    }

    clearStateCompra(e) {
        e.preventDefault();
        this.setState({ compra: initialState.compra })
    }

    reloadPage() {
        document.location.reload(false);
    }

    componentWillMount() {
        let componenteAtual = this;
        axios({
            method: 'get',
            url: 'http://localhost:5000/api/materiais',
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

        axios({
            method: 'get',
            url: 'http://localhost:5000/api/compraMateriais',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            componenteAtual.setState({ compras: response.data })
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    listarMateriais() {
        return (
            this.state.materiais.map(material => {
                return (
                    <React.Fragment>
                        <option value={material.id}>{material.nome}</option>
                    </React.Fragment>
                )
            })
        )
    }

    listarAdministradores() {
        return (
            this.state.administradores.map(administrador => {
                return (
                    <React.Fragment>
                        <option value={administrador.id}>{administrador.nome}</option>
                    </React.Fragment>
                )
            })
        )
    }

    handleEditMaterial(e, dadosMaterial) {
        var material = { ...this.state.material }
        material = dadosMaterial;
        this.setState({ material });
    }

    handleChangeMaterial(e) {
        const material = { ...this.state.material }
        material[e.target.name] = e.target.value;
        this.setState({ material });
        console.log(this.state.material);
        console.log(e.target.name);
        console.log(e.target.value);
    }

    handleEditCompra(e, dadosCompra) {
        var compra = { ...this.state.compra }
        compra = dadosCompra;
        this.setState({ compra });
    }

    handleChangeCompra(e) {
        const compra = { ...this.state.compra }
        compra[e.target.name] = e.target.value
        this.setState({ compra })
        console.log(this.state.compra);
        console.log(e.target.name);
        console.log(e.target.value);
    }

    incluirNovoMaterial(e) {
        e.preventDefault();
        let componenteAtual = this;
        if ((!this.state.material.nome) || (!this.state.material.quantidade) || 
            (!this.state.material.descricao)){
            alert("Campos obrigatórios não preenchidos.")
        }else{
            axios({
                method: 'post',
                url: 'http://localhost:5000/api/materiais',
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
    }

    editarMaterial(e, idMaterial) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'put',
            url: 'http://localhost:5000/api/materiais/' + idMaterial,
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
            url: 'http://localhost:5000/api/materiais/' + idMaterial,
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

    listarComprasMaterial(e, idMaterial) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'get',
            url: 'http://localhost:5000/api/compraMateriais/material/' + idMaterial,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            componenteAtual.setState({ comprasMaterial: response.data })
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    incluirNovaCompra(e) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/compraMateriais',
            data: {
                admin_id: this.state.compra.admin_id,
                material_id: this.state.compra.material_id,
                fornecedor: this.state.compra.fornecedor,
                valor: this.state.compra.valor,
                quantidade: this.state.compra.quantidade,
                data: this.state.compra.data
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            // console.log(response);
            alert("Compra cadastrada com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao cadastrar a compra!");
        });
    }

    editarCompra(e, idCompra) {
        e.preventDefault();
        let componenteAtual = this;
        axios({
            method: 'put',
            url: 'http://localhost:5000/api/compraMateriais/' + idCompra,
            data: {
                admin_id: this.state.compra.admin_id,
                material_id: this.state.compra.material_id,
                fornecedor: this.state.compra.fornecedor,
                valor: this.state.compra.valor,
                quantidade: this.state.compra.quantidade,
                data: this.state.compra.data
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response);
            alert("Compra editada com sucesso!");
            componenteAtual.reloadPage();
        })
        .catch(function(error) {
            console.log(error);
            alert("Ocorreu um erro ao editar a compra!");
        });
    }

    renderTopButtons() {
        return (
            <div className="text-right">

                <button className="btn btn-primary mr-1" data-toggle="modal" data-target="#inserirNovoMaterial">
                    <i className="fa fa-plus mr-3"></i>Novo material
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
                                                <textarea type="text" className="form-control" name="descricao" onChange={e => this.handleChangeMaterial(e)} placeholder="Descrição do material"></textarea>
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
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => this.clearStateMaterial(e)}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={e => this.incluirNovoMaterial(e)}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Fim Modal Novo Material */}

                <button className="btn btn-dark ml-1 mr-1" data-toggle="modal" data-target="#inserirNovaCompra">
                    <i className="fa fa-cart-plus mr-3"></i>
                    Nova compra
                </button>

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
                                                <label>Material</label>
                                                <select className="form-control" name="material_id" onChange={e => this.handleChangeCompra(e)}>
                                                    <option value="" selected disabled>Selecione...</option>
                                                    {this.listarMateriais()}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Administrador</label>
                                                <select className="form-control" name="admin_id" onChange={e => this.handleChangeCompra(e)}>
                                                    <option value="" selected disabled>Selecione...</option>
                                                    {this.listarAdministradores()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Quantidade</label>
                                                <input type="number" className="form-control" name="quantidade" onChange={e => this.handleChangeCompra(e)} placeholder="Quantidade do material" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Valor da compra</label>
                                                <input type="text" className="form-control" name="valor" onChange={e => this.handleChangeCompra(e)} placeholder="R$ 0,00" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Fornecedor</label>
                                                <input type="text" className="form-control" name="fornecedor" onChange={e => this.handleChangeCompra(e)} placeholder="Fornecedor do material" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                            <div className="form-group">
                                                <label>Data da compra</label>
                                                <input type="date" className="form-control" name="data" onChange={e => this.handleChangeCompra(e)} />
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
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => this.clearStateCompra(e)}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={e => this.incluirNovaCompra(e)}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Fim Modal Nova Compra de Material */}

                <button className="btn btn-info text-left ml-1 mr-1" data-toggle="modal" data-target="#listarCompras">
                    <i className="fa fa-shopping-cart mr-3"></i>
                    Listar compras
                </button>

                {/* Início Modal listar Compras de Material */}
                <div className="modal fade" id="listarCompras" tabIndex="-1" role="dialog" aria-labelledby="ModalListarCompras" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalListarCompras"><i className="fa fa-shopping-cart"></i> Lista de Compras</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-hover mt-4 text-center">
                                    <thead>
                                        <tr>
                                            <th>Administrador</th>
                                            <th>Material</th>
                                            <th>Quantidade</th>
                                            <th>Fornecedor</th>
                                            <th>Valor</th>
                                            <th>Data</th>
                                            <th>Editar</th>
                                        </tr>
                                    </thead>
                                
                                    <tbody>
                                        {this.state.compras.map(compra => {
                                            return (
                                                <tr key={compra.id}>
                                                    <td>{compra.admin}</td>
                                                    <td>{compra.material}</td>
                                                    <td>{compra.quantidade}</td>
                                                    <td>{compra.fornecedor}</td>
                                                    <td>{compra.valor}</td>
                                                    <td>{compra.data}</td>
                                                    <td>
                                                        <button className="btn btn-warning" data-toggle="modal" data-target={"#editarCompra-" + compra.id} onClick={e => this.handleEditCompra(e, compra)}>
                                                            <i className="fa fa-pencil"></i>
                                                        </button>

                                                        {/* Início Modal Alterar Compra de Material */}
                                                        <div className="modal fade" style={{zIndex: 1}} id={"editarCompra-" + compra.id} tabIndex="-1" role="dialog" aria-labelledby="ModalAlterarCompra" aria-hidden="true">
                                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title" id="ModalAlterarCompra"><i className="fa fa-pencil mr-3"></i> Alterar Compra de Material</h5>
                                                                        <button type="button" className="close" data-toggle="modal" data-target={"#editarCompra-" + compra.id} aria-label="Fechar">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <div className="form">
                                                                            <div className="row">
                                                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                                                    <div className="form-group">
                                                                                        <label>Material</label>
                                                                                        <select className="form-control" name="material_id" value={this.state.compra.material_id} onChange={e => this.handleChangeCompra(e)}>
                                                                                            <option value="" selected disabled>Selecione...</option>
                                                                                            {this.listarMateriais()}
                                                                                        </select>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                                                    <div className="form-group">
                                                                                        <label>Administrador</label>
                                                                                        <select className="form-control" name="admin_id" value={this.state.compra.admin_id} onChange={e => this.handleChangeCompra(e)}>
                                                                                            <option value="" selected disabled>Selecione...</option>
                                                                                            {this.listarAdministradores()}
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                                                    <div className="form-group">
                                                                                        <label>Quantidade</label>
                                                                                        <input type="number" className="form-control" name="quantidade" value={this.state.compra.quantidade} onChange={e => this.handleChangeCompra(e)} placeholder="Quantidade do material" />
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                                                    <div className="form-group">
                                                                                        <label>Valor da compra</label>
                                                                                        <input type="text" className="form-control" name="valor" value={this.state.compra.valor} onChange={e => this.handleChangeCompra(e)} placeholder="R$ 0,00" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                                                    <div className="form-group">
                                                                                        <label>Fornecedor</label>
                                                                                        <input type="text" className="form-control" name="fornecedor" value={this.state.compra.fornecedor} onChange={e => this.handleChangeCompra(e)} placeholder="Fornecedor do material" />
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-12 col-md-6 text-left campo-form-modal">
                                                                                    <div className="form-group">
                                                                                        <label>Data da compra</label>
                                                                                        <input type="date" className="form-control" name="data" value={this.state.compra.data} onChange={e => this.handleChangeCompra(e)} />
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
                                                                        <button type="button" className="btn btn-secondary" data-toggle="modal" data-target={"#editarCompra-" + compra.id} onClick={e => this.clearStateCompra(e)}>Cancelar</button>
                                                                        <button type="button" className="btn btn-primary" onClick={e => this.editarCompra(e, compra.id)}>Salvar</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Fim Modal Alterar Compra de Material */}
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
                {/* Fim Modal listar Compras de Material */}

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
                                                        <input type="text" className="form-control" name="nome" value={this.state.material.nome} onChange={e => this.handleChangeMaterial(e)} placeholder="Nome do material" />
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

                        <button className="btn btn-info ml-1" data-toggle="modal" data-target={"#listarComprasMaterial-" + material.id} onClick={e => this.listarComprasMaterial(e, material.id)}>
                            <i className="fa fa-shopping-cart"></i>
                        </button>

                        {/* Início Modal listar Compras de um Material */}
                        <div className="modal fade" id={"listarComprasMaterial-" + material.id} tabIndex="-1" role="dialog" aria-labelledby="ModalListarComprasMaterial" aria-hidden="true">
                            <div className="modal-dialog modal-xl" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ModalListarComprasMaterial"><i className="fa fa-shopping-cart"></i> Lista de Compras - {material.nome}</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <table className="table table-hover mt-4 text-center">
                                            <thead>
                                                <tr>
                                                    <th>Administrador</th>
                                                    <th>Quantidade</th>
                                                    <th>Fornecedor</th>
                                                    <th>Valor</th>
                                                    <th>Data</th>
                                                    <th>Editar</th>
                                                </tr>
                                            </thead>
                                        
                                            <tbody>
                                                {console.log(this.state.comprasMaterial)}
                                                {this.state.comprasMaterial.map(compra => {
                                                    return (
                                                        <tr key={compra.id}>
                                                            <td>{compra.admin}</td>
                                                            <td>{compra.quantidade}</td>
                                                            <td>{compra.fornecedor}</td>
                                                            <td>{compra.valor}</td>
                                                            <td>{compra.data}</td>
                                                            <td>
                                                                <button className="btn btn-warning" data-toggle="modal" data-target={"#editarMaterialCompra-" + compra.material_id + "-" + compra.id} onClick={e => this.handleEditCompra(e, compra)}>
                                                                    <i className="fa fa-pencil"></i>
                                                                </button>

                                                                {/* Início Modal Alterar Compra de um Material Específico */}
                                                                <div className="modal fade" style={{zIndex: 1}} id={"editarMaterialCompra-" + compra.material_id + "-" + compra.id} tabIndex="-1" role="dialog" aria-labelledby="ModalAlterarMaterialCompra" aria-hidden="true">
                                                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title" id="ModalAlterarMaterialCompra"><i className="fa fa-pencil mr-3"></i> Alterar Compra de Material</h5>
                                                                                <button type="button" className="close" data-toggle="modal" data-target={"#editarMaterialCompra-" + compra.material_id + "-" + compra.id} aria-label="Fechar">
                                                                                    <span aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <div className="form">
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                                                                            <div className="form-group">
                                                                                                <label>Material</label>
                                                                                                <select className="form-control" name="material_id" value={this.state.compra.material_id} onChange={e => this.handleChangeCompra(e)}>
                                                                                                    <option value="" selected disabled>Selecione...</option>
                                                                                                    {this.listarMateriais()}
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                                                                            <div className="form-group">
                                                                                                <label>Administrador</label>
                                                                                                <select className="form-control" name="admin_id" value={this.state.compra.admin_id} onChange={e => this.handleChangeCompra(e)}>
                                                                                                    <option value="" selected disabled>Selecione...</option>
                                                                                                    {this.listarAdministradores()}
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                                                                            <div className="form-group">
                                                                                                <label>Quantidade</label>
                                                                                                <input type="number" className="form-control" name="quantidade" value={this.state.compra.quantidade} onChange={e => this.handleChangeCompra(e)} placeholder="Quantidade do material" />
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                                                                            <div className="form-group">
                                                                                                <label>Valor da compra</label>
                                                                                                <input type="text" className="form-control" name="valor" value={this.state.compra.valor} onChange={e => this.handleChangeCompra(e)} placeholder="R$ 0,00" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="row">
                                                                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                                                                            <div className="form-group">
                                                                                                <label>Fornecedor</label>
                                                                                                <input type="text" className="form-control" name="fornecedor" value={this.state.compra.fornecedor} onChange={e => this.handleChangeCompra(e)} placeholder="Fornecedor do material" />
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-12 col-md-6 text-left campo-form-modal">
                                                                                            <div className="form-group">
                                                                                                <label>Data da compra</label>
                                                                                                <input type="date" className="form-control" name="data" value={this.state.compra.data} onChange={e => this.handleChangeCompra(e)} />
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
                                                                                <button type="button" className="btn btn-secondary" data-toggle="modal" data-target={"#editarMaterialCompra-" + compra.material_id + "-" + compra.id} onClick={e => this.clearStateCompra(e)}>Cancelar</button>
                                                                                <button type="button" className="btn btn-primary" onClick={e => this.editarCompra(e, compra.id)}>Salvar</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* Fim Modal Alterar Compra de um Material Específico */}
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
                        {/* Fim Modal listar Compras de um Material */}
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