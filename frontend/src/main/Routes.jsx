import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'


import Home from '../components/home/Home'
import Ativos from '../components/membros/Ativos'
import Arquivados from '../components/membros/Arquivados'
import Administradores from '../components/administradores/Administradores'
import Grupos from '../components/grupos/Grupos'
import Materiais from '../components/materiais/Materiais'
import Musica from '../components/musica/Musicas'
import Apresenetacoes from '../components/apresentacoes/Apresentacoes'


export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/membros/ativos' component={Ativos} />
        <Route path='/membros/arquivados' component={Arquivados} />
        <Route path='/administradores' component={Administradores} />
        <Route path='/grupos' component={Grupos} />
        <Route path='/materiais' component={Materiais} />
        <Route path='/musicas' component={Musica} />
        <Route path='/apresentacoes' component={Apresenetacoes} />
        <Redirect from='*' to='/' />
    </Switch>