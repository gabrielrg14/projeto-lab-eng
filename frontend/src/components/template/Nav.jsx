import './Nav.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import App from '../../main/App'

export default class Nav extends Component {

    constructor(props) {
        super(props);

        this.dropdownMembros = this.dropdownMembros.bind(this);
    }

    logout() {
        localStorage.removeItem('logado');
        document.location.reload(false);
        return <App />
    }

    dropdownMembros() {
        var dropdown = document.getElementById("dropdown-membros");
        dropdown.classList.toggle("open");
        var seta = document.getElementById("seta-dropdown-membros");
        if(dropdown.classList.contains("open")) {
            seta.classList.remove("fa-caret-down");
            seta.classList.add("fa-caret-up");
        } else {
            seta.classList.remove("fa-caret-up");
            seta.classList.add("fa-caret-down");
        }
    }

    render() {
        return (
            <aside className="menu-area">
                <nav className="menu">
                    <div className="dropdown">
                        <a type="button" className="text-sm-center text-md-left" id="dropMembros" onClick={this.dropdownMembros}>
                            <i className="fa fa-user-circle-o"></i>Membros<i className="fa fa-caret-down" id="seta-dropdown-membros"></i>
                        </a>
                    
                        <div className="drop-item" id="dropdown-membros">
                            <Link to="/membros/ativos">
                                <i className="fa fa-user"></i> Ativos
                            </Link>

                            <Link to="/membros/arquivados">
                                <i className="fa fa-user-times"></i> Arquivados
                            </Link>
                        </div>
                    </div>

                    <Link className="text-sm-center text-md-left" to="/administradores">
                        <i className="fa fa-suitcase"></i> Administradores
                    </Link>

                    <Link className="text-sm-center text-md-left" to="/grupos">
                        <i className="fa fa-users"></i> Grupos
                    </Link>

                    <Link className="text-sm-center text-md-left" to="/materiais">
                        <i className="fa fa-puzzle-piece"></i> Materiais
                    </Link>

                    {/* <Link className="text-sm-center text-md-left" to="/formacoes">
                        <i className="fa fa-th-large"></i> Formações
                    </Link> */}

                    <Link className="text-sm-center text-md-left" to="/musicas">
                        <i className="fa fa-music"></i> Músicas
                    </Link>

                    <Link className="text-sm-center text-md-left" to="/apresentacoes">
                        <i className="fa fa-eye"></i> Apresentações
                    </Link>

                    <a className="text-sm-center text-md-left" href="" data-toggle="modal" data-target="#ConfirmarLogout">
                        <i className="fa fa-sign-out"></i> Sair
                    </a>

                    {/* Início Modal Confirmar Logout */}
                    <div className="modal fade" id="ConfirmarLogout" tabIndex="-1" role="dialog" aria-labelledby="ModalConfirmar Logout" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ModalConfirmar Logout"><i className="fa fa-sign-out"></i> Logout</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Deseja mesmo sair do sistema?
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClickCapture={() => this.logout()}>Sim</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Fim Modal confirmar Logout */}

                </nav>
            </aside>
        )
    }
}