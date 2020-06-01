import React from 'react'
import './Login.css'

export default props =>
    <div className="col-12 text-center login-sistema">
        <div className="container">
            <h2>Gerenciador de Membros</h2>
            <p className="text-muted mb-5">Acesse o portal com e-mail e senha</p>

            <form className="">

                <div className="col-6 offset-3 form-group">
                    <input className="form-control" type="text" name="username" placeholder="E-mail" />
                    <span className=""></span>
                </div>
            
                <div className="col-6 offset-3 form-group">
                    <input className="form-control" type="password" name="pass" placeholder="Senha" />
                    <span className=""></span>
                </div>
            
                <div className="col-6 offset-3 form-group opcoes-abaixo">
                    <div className="manter-conectado">
                        <input className="mr-1 text-left" type="checkbox" name="manter-me" />
                        <label>
                            Manter-me conectado
                        </label>
                    </div>

                    <div className="esqueci-senha">
                        <a href="#" className="">
                            Esqueci a senha
                        </a>
                    </div>
                </div>

                
                <div className="col-6 offset-3">
                    <button className="btn btn-block btn-primary">
                        Entrar
                    </button>
                </div>

			</form>
        </div>
    </div>