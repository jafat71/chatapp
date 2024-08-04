/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [login] = useLogin();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await login({ username, password });
        setLoading(false);
    };

    return (
        <div className="">
            <div className="hero min-h-screen text-black">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="flex flex-col items-center justify-center lg:text-left">
                        <div className="flex flex-col items-center lg:flex-row transition-all duration-500">
                            <img src="./random-logo.svg" className="w-[150px]" alt="Logo"></img>
                            <h1 className="text-5xl font-bold border-black">INSTACHAT</h1>
                        </div>
                    </div>

                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="username"
                                    className="input input-bordered text-white focus:ring-2 focus:ring-rose-500"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="password"
                                    className="input input-bordered text-white focus:ring-2 focus:ring-rose-500"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-control">
                                <label className="cursor-pointer label">
                                    <span className="label-text">Show Password</span>
                                    <input 
                                        type="checkbox" 
                                        className="checkbox checkbox-primary" 
                                        checked={showPassword}
                                        onChange={() => setShowPassword(!showPassword)} 
                                    />
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}>
                                    {loading ? <span className="loading loading-spinner"></span> : "Login"}
                                </button>
                            </div>
                        </form>
                        <label className="label">
                            <span className="mx-8 label-text">Don't have an account?</span>
                        </label>
                        <Link to="/signup" className="my-2 flex justify-center">
                            <button
                                className="btn btn-secondary w-[20rem]"
                                disabled={loading}
                            >
                                {loading ? <span className="loading loading-spinner"></span> : "Signup"}
                            </button>
                        </Link>
                        <Link to="/reset" className="my-2 flex justify-center">
                            <span className="mx-8 label-text">Forget Password?</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
