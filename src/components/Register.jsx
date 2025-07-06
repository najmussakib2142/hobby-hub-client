import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../provider/AuthContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import Loading from './Loading';


const Register = () => {
    const { createUser, setUser, updateUser, googleSignIn } = use(AuthContext)

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()


    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        const form = e.target;
        const formData = new FormData(form)
        const email = formData.get('email')
        const password = formData.get('password')
        const name = formData.get('name')
        const photo = formData.get('photo')

        const uppercaseReg = /[A-Z]/;
        const lowercaseReg = /[a-z]/;

        if (password.length < 6) {
            setError("Password must be at least 6 characters long!");
            return;
        }
        if (!uppercaseReg.test(password)) {
            setError("Password must contain at least one uppercase letter!");
            return;
        }
        if (!lowercaseReg.test(password)) {
            setError("Password must contain at least one lowercase letter!");
            return;
        }


        // firebase
        createUser(email, password)
            .then(result => {
                const user = result.user;
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        toast.success("Registration Successful!");
                        navigate('/')
                    })
                    .catch((error) => {
                        setError(error.message);
                        setUser(user)
                    });
            })
            .catch(error => {
                const errorCode = error.code;
                setError(errorCode);
            })



    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(() => {
                toast.success("Logged in with Google!");
                navigate(location.state ? location.state : "/");
            })
            .catch(error => {
                toast.error(error.message)
            })
    }

    return (
        // <div className="hero py-10 lg:pt-10 bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 min-h-screen items-center flex-col justify-center lg:flex-row-reverse">
           <div className="hero min-h-screen items-center lg:pt-10 flex-col justify-center lg:flex-row-reverse bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
           <Helmet>
                <title>HobbyHub || Register</title>
            </Helmet>

            <div className="card p-4 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-4xl font-bold text-primary text-center">Register your account</h1>
                <div className="card-body p-5">
                    <form onSubmit={handleRegister} className="fieldset">
                        {/* name */}
                        <label className="label">Your Name</label>
                        <input required name='name' type="text" className="input select-primary " placeholder="Enter your name" />
                        {/* photo */}
                        <label className="label">Photo URL</label>
                        <input required name='photo' type="text" className="input select-primary" placeholder="Enter your URL" />
                        {/* email */}
                        <label className="label">Email</label>
                        <input required name='email' type="email" className="input select-primary" placeholder="Email" />
                        {/* password */}
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
                                className='absolute btn btn-xs right-5 top-2'
                                type='button'
                            >
                                {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                            </button>
                        </div>
                        {/* check box */}
                        <label className="label py-1">
                            <input name='terms' type="checkbox" className="checkbox" />
                            Accept Term & conditions
                        </label>

                        {error && <p className='text-red-500 text-sm'>{error}</p>}

                        {/* <button type='submit' className="w-full py-3 rounded-md bg-primary text-white font-semibold hover:bg-blue-700 transition">Register</button> */}

                        <button type='submit' className="w-full py-3 rounded-md bg-primary text-white font-semibold hover:bg-blue-700 transition">
                            Register
                        </button>
                        <button onClick={handleGoogleLogin} 
                        className="btn hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 hover:border hover:border-primary dark:border-gray-600 dark:hover:bg-gray-700 transition mt-1 bg-base-100 text-black border-[#e5e5e5]">

                            <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>

                        <p className='text-center pt-3'>Already Have An Account ?
                            <Link className='text-blue-600 hover:underline' to="/auth/login"> Login </Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;