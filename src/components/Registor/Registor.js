import React, { Component } from 'react'

class Registor extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            Email: '',
            Password: '',
            Name: ''
        }
    }

    OnNameChange = (event) => {
        this.setState({Name: event.target.value})
    }

    OnEmailChange = (event) => {
        this.setState({Email: event.target.value})
    }

    OnPasswordChange = (event) => {
        this.setState({Password: event.target.value})
    }

    OnSubmit = () => {
        fetch("https://blooming-fortress-28783.herokuapp.com/register", {
            method: 'post',
            headers : {'Content-type':'application/json'},
            body: JSON.stringify({
                email: this.state.Email,
                password: this.state.Password,
                name: this.state.Name
            })
        }).then(responce => responce.json()).then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.OnRouteChange("home");
            }
        })
    }
    
    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Registor</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input
                            onChange = {this.OnNameChange} 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name"  
                            id="name" 
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                            onChange = {this.OnEmailChange} 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                            onChange = {this.OnPasswordChange} 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password" />
                        </div>
                        </fieldset>
                        <div className="">
                        <input
                        onClick = {this.OnSubmit}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="submit"
                        value="Registor"/>
                        </div>
                    </div>
                </main>
            </article>
    
        );
    }
}

export default Registor;