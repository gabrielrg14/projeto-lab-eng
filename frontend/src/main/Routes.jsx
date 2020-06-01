import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import Membros from '../components/membros/Membros'
import Grupos from '../components/grupos/Grupos'
import Materiais from '../components/materiais/Materiais'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/membros' component={Membros} />
        <Route path='/grupos' component={Grupos} />
        <Route path='/materiais' component={Materiais} />
        <Redirect from='*' to='/' />
    </Switch>