import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Lista de Membros',
    subtitle: 'Membros / Lista'
}

const initialState = {
    membros: [
        { nome: 'Rodrigo', grupo: 'Grupo X', mensalidade: 'Em dia', status: 'Ativo', ultima_mensalidade: '2017-10-31 23:12:00' },
        { nome: 'Gabriel', grupo: 'Grupo Y', mensalidade: 'Pendente', status: 'Desativado', ultima_mensalidade: '2017-10-31 24:15:00' },
        { nome: 'Felipe', grupo: 'Grupo Z', mensalidade: 'Atrasada', status: 'Desativado', ultima_mensalidade: '2017-10-31 24:27:02' }
    ],
}

export default class UserCrud extends Component {

    state = { ...initialState }

    /* Possível reutilização para Tela de Alteração de usuário */
    // renderForm() {
    //     return (
    //         <div className="form">
    //             <div className="row">
    //                 <div className="col-12 col-md-6">
    //                     <div className="form-group">
    //                         <label>Nome</label>
    //                         <input type="text" className="form-control"
    //                             name="name"
    //                             value={this.state.user.name}
    //                             onChange={e => this.updateField(e)}
    //                             placeholder="Digite o nome..." />
    //                     </div>
    //                 </div>

    //                 <div className="col-12 col-md-6">
    //                     <div className="form-group">
    //                         <label>E-mail</label>
    //                         <input type="text" className="form-control"
    //                             name="email"
    //                             value={this.state.user.email}
    //                             onChange={e => this.updateField(e)}
    //                             placeholder="Digite o e-mail..." />
    //                     </div>
    //                 </div>
    //             </div>

    //             <hr />
    //             <div className="row">
    //                 <div className="col-12 d-flex justify-content-end">
    //                     <button className="btn btn-primary"
    //                         onClick={e => this.save(e)}>
    //                         Salvar
    //                     </button>

    //                     <button className="btn btn-secondary ml-2"
    //                         onClick={e => this.clear(e)}>
    //                         Cancelar
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    renderTopButtons() {
        return (
            <div className="text-right">
                <button type="button" className="btn btn-primary mr-1" data-toggle="modal" data-target="#inserirNovoMembro">
                    <i className="fa fa-plus mr-3"></i>
                    Novo membro
                </button>
                <button className="btn btn-dark ml-1">
                    Ações
                    <i class="fa fa-caret-down ml-3"></i>
                </button>

                {/* Início Modal novo Membro */}
                <div class="modal fade" id="inserirNovoMembro" tabindex="-1" role="dialog" aria-labelledby="ModalNovoMembro" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalNovoMembro">Novo membro</h5>
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
                                                <input type="text" className="form-control" name="name" placeholder="Nome do membro" />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label>CPF</label>
                                                <input type="text" className="form-control" name="cpf" placeholder="CPF do membro" />
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
                {/* Fim Modal novo Membro */}
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Grupo</th>
                        <th>Mensalidade</th>
                        <th>Status</th>
                        <th>Última mensalidade</th>
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
                <tr key='1'>
                    <td>{membro.nome}</td>
                    <td>{membro.grupo}</td>
                    <td>{membro.mensalidade}</td>
                    <td>{membro.status}</td>
                    <td>{membro.ultima_mensalidade}</td>
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