import React from 'react'
import './sign-up.styles.scss'
import { createUserProfileDocument } from '../firebase/firebase.utils';
import { auth } from '../firebase/firebase.utils';
import { writeUserData } from '../firebase/firebase.utils';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            const userRef = await createUserProfileDocument(user, { displayName });
            const snapShot = await userRef.get();
            await writeUserData(snapShot.data())


            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.log(error);
        }


    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state
        return (
            <div className='sign-up'>
                <div className='title'>
                    <h2>Sign up for free</h2>
                    <span>If you don't have an account yet!</span>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp"
                            name='displayName'
                            value={displayName}
                            onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                            name='email'
                            value={email}
                            onChange={this.handleChange}></input>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password"
                            name='password'
                            value={password}
                            onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword"
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={this.handleChange}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign-up</button>
                </form>
            </div>
        )
    }
}



export default SignUp;