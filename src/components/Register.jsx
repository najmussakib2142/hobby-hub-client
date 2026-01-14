import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../provider/AuthContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import Loading from './Loading';


const Register = () => {
    const { createUser, setUser, updateUser, googleSignIn } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const [photoURL, setPhotoURL] = useState('');
    const [imageUploading, setImageUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Optional validation
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Image must be under 2MB');
            return;
        }

        setImageUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append(
                'upload_preset',
                import.meta.env.VITE_CLOUDINARY_PRESET
            );

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD
                }/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await res.json();

            if (!data?.secure_url) {
                throw new Error('Upload failed');
            }

            setPhotoURL(data.secure_url);
            toast.success('Profile image uploaded');
        } catch (error) {
            toast.error('Image upload failed');
        } finally {
            setImageUploading(false);
        }
    };

    const validatePassword = (password) => {
        if (password.length < 6) {
            return 'Password must be at least 6 characters long';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!/[a-z]/.test(password)) {
            return 'Password must contain at least one lowercase letter';
        }
        return null;
    };



    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        const form = e.target;
        const formData = new FormData(form);

        const email = formData.get('email');
        const password = formData.get('password');
        const name = formData.get('name');

        // Image check
        if (!photoURL) {
            setError('Please upload a profile photo');
            return;
        }

        // Password validation
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        try {
            setLoading(true);

            const result = await createUser(email, password);

            await updateUser({
                displayName: name,
                photoURL: photoURL,
            });

            setUser({
                ...result.user,
                displayName: name,
                photoURL: photoURL,
            });

            toast.success('Registration successful!');
            navigate('/');
        } catch (err) {
            setError(err.code || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };


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
        <div className="hero min-h-screen items-center lg:pt-10 flex-col justify-center lg:flex-row-reverse ">
            <Helmet>
                <title>HobbyHub || Register</title>
            </Helmet>

            <div className="card p-4 bg-base-100/60 w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-4xl font-bold text-primary text-center">Register your account</h1>
                <div className="card-body ">
                    <form onSubmit={handleRegister} className="fieldset">
                        {/* name */}
                        <label className="label">Your Name</label>
                        <input required name='name' type="text" className="input select-primary " placeholder="Enter your name" />

                        {/* email */}
                        <label className="label">Email</label>
                        <input required name='email' type="email" className="input select-primary " placeholder="Email" />
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
                                className='absolute btn btn-xs right-3 top-2'
                                type='button'
                            >
                                {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                            </button>
                        </div>

                        {/* Profile Photo */}
                        <label className="label">Profile Photo</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="file-input file-input-bordered"
                        />

                        {imageUploading && (
                            <p className="text-sm text-info">Uploading image...</p>
                        )}

                        {photoURL && (
                            <img
                                src={photoURL}
                                alt="Profile preview"
                                className="w-20 h-20 rounded-full mt-2 object-cover border"
                            />
                        )}


                        {/* check box */}
                        <label className="label py-2">
                            <input name='terms' type="checkbox" className="checkbox" />
                            Accept Term & conditions
                        </label>

                        {error && <p className='text-red-500 text-sm'>{error}</p>}

                        {loading && (
                            <p className="text-sm text-gray-500 text-center mt-2">
                                Please wait, creating your account...
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading || imageUploading}
                            className="w-full py-3 rounded-md bg-primary text-white font-semibold disabled:opacity-60"
                        >
                            {loading ? 'Creating account...' : 'Register'}
                        </button>

                        <div className="divider">OR</div>

                        <button onClick={handleGoogleLogin}
                            className="btn hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 hover:border hover:border-primary dark:border-gray-600 dark:hover:bg-gray-700 transition mt-1 bg-base-100 text-black border-[#e5e5e5]">

                            <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>

                        <p className='text-center pt-3'>Already Have An Account ?
                            <Link className='text-blue-600 hover:underline' to="/login"> Login </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;