import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'square-o',
    title: 'Lista de Materiais',
    subtitle: 'Materiais / Lista'
}

const initialState = {
    materiais: [
        { nome: 'Material X', unidades: '1', ultimo_fornecedor: 'Seu Zé da Esquina' },
        { nome: 'Material Y', unidades: '2', ultimo_fornecedor: 'Jobersvau' },
        { nome: 'Material Z', unidades: '3', ultimo_fornecedor: 'Dona Verenice' }
    ],
}

export default class UserCrud extends Component {

    state = { ...initialState }

    renderTopButtons() {
        return (
            <div className="text-right">
                <button className="btn btn-primary mr-1">
                    <i className="fa fa-plus mr-3"></i>Novo material
                </button>
                <button className="btn btn-dark ml-1 mr-1">
                    <i class="fa fa-plus mr-3"></i>
                    Nova compra
                </button>
                <button className="btn btn-dark ml-1">
                    Ações
                    <i class="fa fa-caret-down ml-3"></i>
                </button>
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Unidades</th>
                        <th>Último fornecedor</th>
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
                <tr key='1'>
                    <td>{material.nome}</td>
                    <td>{material.unidades}</td>
                    <td>{material.ultimo_fornecedor}</td>
                    <td>
                        <button className="btn btn-warning">
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-1">
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        });
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderTopButtons()}
                {this.renderTable()}
            </Main>
        )
    }
}