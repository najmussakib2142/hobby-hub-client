import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthContext';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Login = () => {

    const { signIn, googleSignIn } = useContext(AuthContext)
    const location = useLocation()
    // console.log(location);
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        // firebase
        signIn(email, password)
            .then((result) => {
                const user = result.user;
                // console.log(user);
                Swal.fire({
                    icon: "success",
                    title: "Login Successful!",
                    text: `Welcome back, ${user.displayName || user.email}`,
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch((error) => {
                const errorCode = error.code;
                // const errorMessage = error.message;
                setError(errorCode)
            })

    }

    // google
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(() => {
                toast.success("Logged in with Google!");
                navigate(location.state ? location.state : "/");
            })
            .catch(error => {
                const errorCode = error.code;
                setError(errorCode)
            })
    }
    return (
        // <div className='hero min-h-screen items-center lg:pt-10 flex-col justify-center lg:flex-row-reverse bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50'>
        <div className="hero min-h-screen items-center lg:pt-10 flex-col justify-center lg:flex-row-reverse ">

            <Helmet>
                <title>HobbyHub || Login</title>
            </Helmet>
            <div className="card p-4 bg-base-100/60 w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-4xl font-bold text-primary text-center">Login now!</h1>
                <div className="card-body">
                    <form onSubmit={handleLogin} className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" required name='email' className="input select-primary" placeholder="Email" />
                        <label className="label">Password</label>
                        <div className='relative'>
                            <input
                                required
                                name='password'
                                type={showPassword ? 'text' : "password"}
                                className="input select-primary"
                                placeholder="Password"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute btn btn-xs right-3 top-2'
                                type='button'
                            >
                                {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                            </button>
                        </div>

                        <div className='py-1'><a className="link link-hover ">Forgot password?</a></div>
                        {error && <p className='text-red-500 text-sm'>{error}</p>}

                        <button type='submit' className="btn bg-primary text-white border-primary">Login</button>
                        <div className="divider">OR</div>
                        <button onClick={handleGoogleLogin} className="btn dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 mt-1 bg-base-100 hover:bg-gray-50 hover:border-primary transition text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>
                        <p className='text-center pt-3'>Dont’t Have An Account ?
                            <Link className='text-blue-600 hover:underline' to="/register"> Register </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;