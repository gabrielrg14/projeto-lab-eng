import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import './Login.css'


export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            senha: '',
            redirect: false  
        } 
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    handleChangeSenha(e) {
        this.setState({ senha: e.target.value })
    }
    
    authenticateLogin(e) {
        e.preventDefault();
        var email = this.state.email;
        var senha = this.state.senha;
        alert(email);
        alert(senha);
        console.log(email);
        console.log(senha);

        if(email !== '' || senha !== '') {
            email = email.value;
            senha = senha.value;

            axios({
                method: 'post',
                url: 'https://projetolabengapi.azurewebsites.net/api/admin/login',
                data: {
                    email,
                    senha
                },
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .then(function(response) {
                console.log(response);
                this.setState({
                    redirect: true
                })
            })
            .catch(function(error) {
                console.log(error);
            });
        } else {
            alert("Preencha os campos!");
        }
    }

    renderLogin() {
        return (
            <div className="col-12 text-center">
                <div className="container">
                    <h2>Gerenciador de Membros</h2>
                    <p className="text-muted mb-5">Acesse o portal com e-mail e senha</p>

                    <form onSubmit={e => this.authenticateLogin(e)}>

                        <div className="col-6 offset-3 form-group">
                            <input className="form-control" type="text" onChange={e => this.handleChangeEmail(e)} placeholder="E-mail" />
                        </div>
                    
                        <div className="col-6 offset-3 form-group">
                            <input className="form-control" type="password" onChange={e => this.handleChangeSenha(e)} placeholder="Senha" />
                        </div>
                    
                        <div className="col-6 offset-3 form-group opcoes-abaixo">
                            <div className="manter-conectado">
                                <input className="mr-1 text-left" type="checkbox" name="manter-me" />
                                <label>
                                    Manter-me conectado
                                </label>
                            </div>

                            <div className="esqueci-senha">
                                <a href="" className="">
                                    Esqueci a senha
                                </a>
                            </div>
                        </div>

                        
                        <div className="col-6 offset-3">
                            <button type="submit" className="btn btn-block btn-primary">
                                Entrar
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/" />
        } else {
            return(
                <div className="login-sistema">
                    {this.renderLogin()}
                </div>
            )
        }
    }
}