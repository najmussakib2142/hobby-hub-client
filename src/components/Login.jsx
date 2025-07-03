import React, { use } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthContext';

const Login = () => {

    const { signIn } = use(AuthContext)
    const location = useLocation()
    console.log(location);
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        // firebase
        signIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                alert('successfully login')
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage)
            })
    }
    return (
        <div className='hero min-h-screen items-center flex-col justify-center lg:flex-row-reverse bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50'>
            <div className="card bg-base-100 p-7  w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-5xl text-center font-bold">Login now!</h1>
                <div className="card-body">
                    <form onSubmit={handleLogin} className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input border-primary" placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" name='password' className="input border-primary" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button type='submit' className="btn bg-[#0967C2] text-white border-[#0059b3]">Login</button>
                        {/* Google */}
                        <button className="btn mt-1 bg-white hover:bg-gray-50 hover:border-primary transition text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>
                        <p className='text-center pt-3'>Dont’t Have An Account ?
                            <Link className='text-red-600 hover:underline' to="/auth/register"> Register </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;