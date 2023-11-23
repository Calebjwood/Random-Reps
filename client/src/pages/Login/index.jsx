import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN_MUTATION } from '../../utils/mutations'
import Auth from '../../utils/auth';



export default function Nav() {
    const [login, { loading }] = useMutation(LOGIN_MUTATION);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logingHandler = async (evt) => {
        evt.preventDefault();

        try {
            const { data } = await login({
                variables: { email, password }
            });

            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='row mt-5'>
            <div className='col-4'></div>
        <form className='col-4' id="login-form" onSubmit={logingHandler}>
            <div className='mb-3'>
                <label className='form-label' htmlFor="login-form-email">Email</label>
                <input className="form-control" id="login-form-email" type="text" onChange={(evt) => setEmail(evt.target.value)} />
            </div>
            <div className='mb-3'>
                <label className='form-label' htmlFor="login-form-password">Password</label>
                <input className="form-control" id="login-form-password" type="text" onChange={(evt) => setPassword(evt.target.value)} />
            </div>
            <div>
                <button className='btn btn-primary' type="submit" disabled={loading}>Login</button>
            </div>
        </form>
        <div className='col-4'></div>
        </div>
    );
}