import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../provider/AuthContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const Register = () => {
    const { createUser, setUser, updateUser, googleSignIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [photoURL, setPhotoURL] = useState('');
    const [imageUploading, setImageUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error('Image must be under 2MB');
            return;
        }

        setImageUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/image/upload`,
                { method: 'POST', body: formData }
            );

            const data = await res.json();
            if (!data?.secure_url) throw new Error('Upload failed');

            setPhotoURL(data.secure_url);
            toast.success('Profile image uploaded');
        } catch (err) {
            toast.error('Image upload failed');
        } finally {
            setImageUploading(false);
        }
    };

    const validatePassword = (password) => {
        if (password.length < 6) return 'Password must be at least 6 characters long';
        if (!/[A-Z]/.test(password)) return 'Must contain an uppercase letter';
        if (!/[a-z]/.test(password)) return 'Must contain a lowercase letter';
        return null;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const terms = form.terms.checked;

        if (!terms) {
            setError('Please accept the Terms & Conditions');
            return;
        }

        if (!photoURL) {
            setError('Please upload a profile photo');
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        try {
            setLoading(true);
            const result = await createUser(email, password);
            await updateUser({ displayName: name, photoURL: photoURL });

            setUser({
                ...result.user,
                displayName: name,
                photoURL: photoURL,
            });

            toast.success('Account created successfully!');
            navigate('/');
        } catch (err) {
            setError(err.code || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        try {
            await googleSignIn();
            toast.success("Logged in with Google!");
            navigate("/");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="flex  flex-col lg:flex-row items-start justify-center min-h-screen gap-0 lg:gap-12 px-4">
            <Helmet>
                <title>HobbyHub || Register</title>
            </Helmet>

            {/* Left Side: Branding (matches Login) */}
            <div className="hidden lg:flex flex-col justify-center h-screen sticky top-0 lg:w-1/2 max-w-lg space-y-6 p-10">                <h1 className="text-7xl font-black text-primary tracking-tight">Join HobbyHub</h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                    Create an account to discover communities, track your progress, and connect with like-minded creators.
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className="badge badge-lg badge-outline badge-primary">New Friends</span>
                    <span className="badge badge-lg badge-outline badge-secondary">Growth</span>
                    <span className="badge badge-lg badge-outline badge-accent">Free Forever</span>
                </div>
            </div>

            {/* Right Side: Register Card */}
            <div className='py-16'>
                <div className="card   w-full max-w-md shadow-2xl border border-base-200 z-10">
                    <div className="card-body p-8">
                        <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
                        <p className="text-center text-gray-500 mb-6">Start your journey with us today</p>

                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="form-control">
                                <label className="label font-semibold text-sm">Full Name</label>
                                <input name='name' type="text" placeholder="John Doe" className="input input-bordered focus:outline-primary" required />
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold text-sm">Email Address</label>
                                <input name='email' type="email" placeholder="name@example.com" className="input input-bordered focus:outline-primary" required />
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold text-sm">Password</label>
                                <div className="relative">
                                    <input
                                        name='password'
                                        type={showPassword ? 'text' : "password"}
                                        placeholder="••••••••"
                                        className="input input-bordered w-full focus:outline-primary"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-primary transition-colors"
                                    >
                                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold text-sm">Profile Photo</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="file-input file-input-bordered file-input-sm w-full"
                                    />
                                    {photoURL && (
                                        <div className="avatar">
                                            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img src={photoURL} alt="Preview" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {imageUploading && <span className="loading loading-dots loading-xs mt-2 text-primary"></span>}
                            </div>

                            <div className="form-control mt-2">
                                <label className="label cursor-pointer justify-start gap-3">
                                    <input name="terms" type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                                    <span className="label-text text-xs">I agree to the <a href="#" className="link link-primary">Terms & Conditions</a></span>
                                </label>
                            </div>

                            {error && (
                                <div className="alert alert-error py-2 rounded-md shadow-sm">
                                    <span className="text-sm font-medium">{error}</span>
                                </div>
                            )}

                            <div className="form-control mt-4">
                                <button
                                    type="submit"
                                    disabled={loading || imageUploading || googleLoading}
                                    className="btn btn-primary text-white text-lg"
                                >
                                    {loading ? <span className="loading loading-spinner"></span> : 'Register'}
                                </button>
                            </div>
                        </form>

                        <div className="divider text-gray-400 text-xs uppercase">Or use social</div>

                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading || googleLoading}
                            className="btn btn-outline border-gray-300 hover:bg-gray-50 text-gray-700 w-full gap-3"
                        >
                            {googleLoading ? <span className="loading loading-spinner"></span> : <FcGoogle size={22} />}
                            Continue with Google
                        </button>

                        <p className="text-center mt-8 text-sm text-gray-600">
                            Already have an account?
                            <Link to="/login" className="text-primary font-bold hover:underline ml-2">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;