import React from "react";
import './sign-in.styles.scss'
import { auth } from "../firebase/firebase.utils";

class SignIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state
        await auth.signInWithEmailAndPassword(email, password)
            .catch(error => alert(error.message))
        this.setState({
            email: '',
            password: ''
        })

    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        const { email, password } = this.state
        return (
            <div className='sign-in'>
                <div className='title'>
                    <h2>Sign in into your account</h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            name='email'
                            value={email}
                            onChange={this.handleChange}></input>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            name='password'
                            value={password}
                            onChange={this.handleChange}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign-in</button>
                </form>
            </div>
        )
    }
}




export default SignIn;