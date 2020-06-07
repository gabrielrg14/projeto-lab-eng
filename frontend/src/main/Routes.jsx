import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import Membros from '../components/membros/Membros'
import Materiais from '../components/materiais/Materiais'
import Musica from '../components/musica/Musicas'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/membros' component={Membros} />
        <Route path='/materiais' component={Materiais} />
        <Route path='/musicas' component={Musica} />
        <Redirect from='*' to='/' />
    </Switch>