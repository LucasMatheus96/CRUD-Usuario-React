import React from "react";
import { Component } from "react";
import Main from '../template/Main'
import axios from "axios";

const headerProps = {
    icon:'users',
    title: "Usuários",
    subititle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir.'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: '' },
    list: []
}


export default class UserCrud extends Component {

    state = { ...initialState }

    clear(){
        this.setState({ user: initialState.user })
    }

    save(){
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl

        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }
    
    getUpdatedList(user, add=true){
        const list = this.state.list.filter(u=> u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    render(){
        return (
            <Main {...headerProps}>
                Cadastro de Usuário
            </Main>
        )
    }
}
