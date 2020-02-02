import React from 'react'

import Login from '../views/login'
import Home from '../views/home'
import AuthService from '../app/service/authService'
import CadastroUsuario from '../views/cadastroUsuario'
import ConsultarLancamentos from '../views/lancamentos/consultarLancamentos'
import CadastrarLancamentos from '../views/lancamentos/cadastroLancamentos'
import{AuthConsumer} from '../main/provedorAutenticacao'

import{Route, Switch, HashRouter,Redirect} from 'react-router-dom'

const authService = new AuthService();



function RotaAutenticada({component: Component, isUsuarioAutenticado, ...props}){
   return (
       <Route {...props} render={(componentProps) =>{
           if(isUsuarioAutenticado){
               return(
                 <Component {...componentProps} />
               )
           }else{
               return (
                   <Redirect to={{pathname: '/login', state:{from: componentProps.location}}}/>
               )
           }
       }}/>
   )
}

function Routes(props){
    return(
        <HashRouter>
            <Switch>     
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}/>

                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultarLancamentos}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastra-lancamentos/:id?" component={CadastrarLancamentos}/>
            </Switch>
        </HashRouter>
    )
}

export default () =>(
   <AuthConsumer>
       {(context) => (<Routes isUsuarioAutenticado={context.isAutenticado}/>)}
   </AuthConsumer>
)