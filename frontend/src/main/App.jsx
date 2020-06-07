import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import Login from '../components/login/Login'
import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Routes from './Routes'

axios.defaults.withCredentials = true

export default class App extends Component {

    constructor(props){
        super(props);
        var verificaLogado = localStorage.getItem('logado');
        console.log(verificaLogado);
        this.state = {
            email: '',
            senha: '',
            logado: verificaLogado ? true : false
        }
        console.log(this.state.logado)
    }

    verificaLogado() {
        if(this.state.logado) {
            console.log('1');
            return (
                <div className="app">
                    <Logo />
                    <Nav />
                    <Routes />
                </div>
            )
        } else {
            console.log('2');
            return <Login />
        }
    }

    render() {
        return (
            <BrowserRouter>
                {this.verificaLogado()}
            </BrowserRouter>
        )
    }
}
