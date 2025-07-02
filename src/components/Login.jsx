import React from 'react';

const Login = () => {
    return (
        <div className='hero min-h-screen items-center flex-col justify-center lg:flex-row-reverse bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50'>
            <div className="card bg-base-100 p-7  w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-5xl text-center font-bold">Login now!</h1>
                <div className="card-body">
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default Login;