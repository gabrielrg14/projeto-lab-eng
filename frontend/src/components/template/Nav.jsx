import './Nav.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends Component {

    constructor(props) {
        super(props);

        this.dropdownMembros = this.dropdownMembros.bind(this);
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
                    <a type="button" className="text-sm-center text-md-left" onClick={this.dropdownMembros}>
                        <i className="fa fa-users"></i> Membros <i className="fa fa-caret-down" id="seta-dropdown-membros"></i>
                    </a>

                    <div className="dropdown" id="dropdown-membros">
                        <Link to="/membros/ativos">
                            <i className="fa fa-user"></i> Ativos
                        </Link>

                        <Link to="/membros/arquivados">
                            <i className="fa fa-user-times"></i> Arquivados
                        </Link>
                    </div>


                    <Link className="text-sm-center text-md-left" to="/administradores">
                        <i className="fa fa-user-plus"></i> Administradores
                    </Link>

                    <Link className="text-sm-center text-md-left" to="/grupos">
                        <i className="fa fa-pencil"></i> Grupos
                    </Link>

                    <Link className="text-sm-center text-md-left" to="/materiais">
                        <i className="fa fa-square-o"></i> Materiais
                    </Link>

                    <Link className="text-sm-center text-md-left" to="/formacoes">
                        <i className="fa fa-square"></i> Formações
                    </Link>

                    <Link className="text-sm-center text-md-left" to="/musicas">
                        <i className="fa fa-circle"></i> Músicas
                    </Link>

                    <Link className="text-sm-center text-md-left" to="/apresentacoes">
                        <i className="fa fa-caret-up"></i> Apresentações
                    </Link>
                </nav>
            </aside>
        )
    }
}