import React from "react";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import './sign-in-and-sign-up.styles.scss'
import { withRouter } from "../../components/HOCs/withRouter";


const SignInAndSignOutPage = () => (
    <div className='sign-in-and-sign-up'>
        <SignUp />
        <SignIn />

    </div>
)

export default withRouter(SignInAndSignOutPage);