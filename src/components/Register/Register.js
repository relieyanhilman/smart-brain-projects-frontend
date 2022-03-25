import React, {Component} from 'react';
//tampung request body yang berisi nama, email, password
//buat trigger setiap perubahan nama, email, password
//buat fungsi setiap ada perubahan bakal mengubah state dari komponen register
//buat trigger di tombol register ke fugnsi onRegister
//buat fungsi onRegister fetch ke http://localhost:3000/register
class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            registerEmail: '',
            registerName: '',
            registerPassword:''
        }
    }
    onRegisterEmail = (event) => {
        this.setState({ registerEmail: event.target.value})
        
    }
    onRegisterName = (event) => {
        this.setState({ registerName: event.target.value})
        
    }
    onRegisterPassword = (event) => {
        this.setState({ registerPassword: event.target.value})
       
    }

    onSubmitRegister = () => {
        //fetch ke http://localhost:3000/register
        //ketika berhasil maka masuk ke fungsi props yang registered after click
        fetch('https://smart-brain-projects-relieyan.herokuapp.com/register', {
            method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: this.state.registerEmail,
            name: this.state.registerName,
            password: this.state.registerPassword
        })
        }
        ).then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.RegisteredAfterClick('home');
            }
        });

        


    }

    

    render(){
        const {RegisteredAfterClick} = this.props;
        return(
            <div>
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0 tc">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 tc" htmlFor="name">Name</label>
                                <input onChange={this.onRegisterName} className="pa2 ba b--black input-reset bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 tc" htmlFor="email-address">Email</label>
                                <input onChange={this.onRegisterEmail} className="pa2 ba b--black input-reset bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="name" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6 tc" htmlFor="password">Password</label>
                                <input onChange={this.onRegisterPassword} className="b pa2 input-reset b--black ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                            </div>
                            
                        </fieldset>

                        <div className="center">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register"
                            onClick={() => this.onSubmitRegister()} />
                        </div>
                    </div>
                </main>
            </article>
        </div>
        )
    }
}


export default Register;