import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { SIGNUP_MUTATION } from '../../utils/mutations'
import Auth from '../../utils/auth';

import './style.scss';

export default function Signup() {
    const [signup, { loading }] = useMutation(SIGNUP_MUTATION);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('')

    const signupHandler = async (evt) => {
        evt.preventDefault();

        try {
            const { data } = await signup({
                variables: { firstName, lastName, email, password }
            });
            console.log(data);
            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form id="signup-form" onSubmit={signupHandler}>
            <div>
                <label htmlFor="signup-form-first-name">First Name</label>
                <input id="signup-form-first" type="text" onChange={(evt) => setFirstName(evt.target.value)} />
            </div>
            <div>
                <label htmlFor="signup-form-last-name">Last Name</label>
                <input id="signup-form-last" type="text" onChange={(evt) => setLastName(evt.target.value)} />
            </div>
            <div>
                <label htmlFor="signup-form-username">Username</label>
                <input id="signup-form-username" type="text" onChange={(evt) => setUsername(evt.target.value)} />
            </div>
            <div>
                <label htmlFor="signup-form-email">Email</label>
                <input id="signup-form-email" type="text" onChange={(evt) => setEmail(evt.target.value)} />
            </div>
            <div>
                <label htmlFor="signup-form-password">Password</label>
                <input id="signup-form-password" type="password" onChange={(evt) => setPassword(evt.target.value)} />
            </div>
            <div>
                <button type='submit' disabled={loading}>Sign Up</button>
            </div>
        </form>
    );
}