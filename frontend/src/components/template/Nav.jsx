import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/membros">
                <i className="fa fa-users"></i> Membros
            </Link>

            <Link to="/">
                <i className="fa fa-pencil"></i> Grupos
            </Link>

            <Link to="/materiais">
                <i className="fa fa-square-o"></i> Materiais
            </Link>

            <Link to="/formacoes">
                <i className="fa fa-square"></i> Formações
            </Link>

            <Link to="/musicas">
                <i className="fa fa-circle"></i> Músicas
            </Link>

            <Link to="/apresentacoes">
                <i className="fa fa-caret-up"></i> Apresentações
            </Link>
        </nav>
    </aside>