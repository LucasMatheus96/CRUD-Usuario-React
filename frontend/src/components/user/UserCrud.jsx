import React from "react";
import { Component } from "react";
import Main from '../template/Main'
import axios from "axios";

const headerProps = {
    icon:'users',
    title: "Usuários",
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir.'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: '' },
    list: []
}


export default class UserCrud extends Component {

    state = { ...initialState }
     
    componentWillMount() {
        axios(baseUrl).then(resp => {
          this.setState({ list: resp.data });
        });
      }

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

    updateField(evento){
        const user = {...this.state.user}
        user[evento.target.name] = evento.target.value
        this.setState({ user })
    }

    renderForm(){

        return (
            <div className="form">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label >Nome</label> 
                        <input type="text" className="form-control" name="name" value={this.state.user.name} onChange={e=> this.updateField(e)} placeholder="Digite um nome"></input>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label >Email</label>
                        <input type="text" className="form-control" name="email" value={this.state.user.email} onChange={e=>this.updateField(e)} placeholder="Digite um email"></input>
                    </div>
                </div>

                <hr></hr>

                <div className="row">
                    
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e=> this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2" onClick={e=> this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                    
                </div>
            </div>
        )
    }

    load(user){
        this.setState({user})
    }

   
    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp =>{
            const list = this.getUpdatedList(user,false)
            this.setState({list})
        })
    }

   renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
 

    renderRows(){
        return this.state.list.map(user =>{
            return (
                <tr key = {user.id}> 
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning">
                            <i className="fa fa-pencil" onClick={()=>this.load(user)}></i>
                        </button>
                        <button className="btn btn-danger ml-2">
                            <i className="fa fa-trash" onClick={()=>this.remove(user)}></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    render(){
        console.log(this.state.list)
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
