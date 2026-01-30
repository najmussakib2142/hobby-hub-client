import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthContext';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    // Dynamic redirect path
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const result = await signIn(email, password);
            Swal.fire({
                icon: "success",
                title: "Welcome back!",
                text: `Successfully logged in as ${result.user.email}`,
                timer: 2000,
                showConfirmButton: false
            });
            navigate(from, { replace: true });
        } catch (err) {
            // Better error parsing
            const errorMessage = err.code === "auth/invalid-credential" 
                ? "Invalid email or password" 
                : "Something went wrong. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        try {
            await googleSignIn();
            toast.success("Logged in with Google!");
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.code);
            toast.error("Google login failed");
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-[100vh] gap-12 px-4 py-10">
            <Helmet>
                <title>HobbyHub || Login</title>
            </Helmet>

            {/* Left Side: Branding */}
            <div className="hidden  lg:block text-left lg:w-1/2 max-w-lg space-y-6">
                <h1 className="text-7xl font-black text-primary tracking-tight">HobbyHub</h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                    Connect with enthusiasts, share your passion, and explore new hobbies. 
                    Login to pick up where you left off.
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className="badge badge-lg badge-outline badge-primary">Community</span>
                    <span className="badge badge-lg badge-outline badge-secondary">Hobbies</span>
                    <span className="badge badge-lg badge-outline badge-accent">Secure</span>
                </div>
            </div>

            {/* Right Side: Login Card */}
            <div className="card  w-full max-w-md shadow-2xl border border-base-200">
                <div className="card-body p-8">
                    <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
                    <p className="text-center text-gray-500 mb-6">Please enter your details</p>
                    
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="form-control">
                            <label className="label font-semibold text-sm">Email Address</label>
                            <input 
                                type="email" 
                                name="email"
                                placeholder="name@example.com" 
                                className="input input-bordered focus:outline-primary" 
                                required 
                            />
                        </div>

                        <div className="form-control">
                            <label className="label font-semibold text-sm">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : "password"}
                                    name="password"
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
                            <label className="label">
                                <Link to="/forgot-password" size="sm" className="label-text-alt link link-hover text-primary">
                                    Forgot password?
                                </Link>
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
                                disabled={loading || googleLoading}
                                className="btn btn-primary text-white text-lg"
                            >
                                {loading ? <span className="loading loading-spinner"></span> : 'Login'}
                            </button>
                        </div>
                    </form>

                    <div className="divider text-gray-400 text-xs">OR CONTINUE WITH</div>

                    <button 
                        onClick={handleGoogleLogin} 
                        disabled={loading || googleLoading}
                        className="btn btn-outline border-gray-300 hover:bg-gray-50 text-gray-700 w-full gap-3"
                    >
                        {googleLoading ? <span className="loading loading-spinner"></span> : <FcGoogle size={22} />}
                        Google
                    </button>

                    <p className="text-center mt-8 text-sm text-gray-600">
                        Don't have an account? 
                        <Link to="/register" className="text-primary font-bold hover:underline ml-2">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;