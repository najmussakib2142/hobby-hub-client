import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../provider/AuthContext';
// import { AuthContext } from '../provider/AuthProvider';


const Register = () => {
    const { createUser, setUser, updateUser } = use(AuthContext)

    const [showPassword, setShowPassword] = useState(false)
    // const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()


    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        const email = formData.get('email')
        const password = formData.get('password')
        const name = formData.get('name')
        const photo = formData.get('photo')
        // console.log(email, password);

        // firebase
        createUser(email, password)
            .then(result => {
                const user = result.user;
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({...user, displayName: name, photoURL: photo});
                        navigate('/')
                    })
                    .catch((error) => {
                        console.log(error);
                        setUser(user)
                    });
            })
            .catch(error => {
                console.log(error);
            })


        // setErrorMessage('');
    }

    const handleGoogleLogin = () => {
        // googleSignIn()
        //     .then(() => {
        //         toast.success("Logged in with Google!");
        //         navigate(location.state ? location.state : "/");
        //     })
        //     .catch(error => {
        //         toast.error(error.message)
        //     })
    }

    return (
        <div className="hero py-10 bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 min-h-screen items-center flex-col justify-center lg:flex-row-reverse">
            {/* <Helmet>
                <title>EventExpo || Register</title>
            </Helmet> */}

            <div className="card p-4 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-4xl font-bold text-center">Register your account</h1>
                <div className="card-body p-5">
                    <form onSubmit={handleRegister} className="fieldset">
                        {/* name */}
                        <label className="label">Your Name</label>
                        <input required name='name' type="text" className="input" placeholder="Enter your name" />
                        {/* photo */}
                        <label className="label">Photo URL</label>
                        <input required name='photo' type="text" className="input" placeholder="Enter your URL" />
                        {/* email */}
                        <label className="label">Email</label>
                        <input required name='email' type="email" className="input" placeholder="Email" />
                        {/* password */}
                        <label className="label">Password</label>
                        <div className='relative'>
                            <input
                                required
                                name='password'
                                type={showPassword ? 'text' : "password"}
                                className="input"
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
                        <label className="label">
                            <input name='terms' type="checkbox" className="checkbox" />
                            Accept Term & conditions
                        </label>

                        {/* {
                            errorMessage && <p className='text-red-600 mt-3'>{errorMessage}</p>
                        } */}

                        <button type='submit' className="w-full py-3 rounded-md bg-primary text-white font-semibold hover:bg-blue-700 transition">Register</button>
                        <button onClick={handleGoogleLogin} className="btn hover:bg-gray-50 transition mt-1 bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>
                        <p className='text-center pt-3'>Already Have An Account ?
                            <Link className='text-red-600 hover:underline' to="/auth/login"> Login </Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;