import { useState } from "react";
import { useResetPassword } from "../../hooks/useResetPassword";
import { Link } from "react-router-dom";

const Reset = () => {
    const [reset] = useResetPassword();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [inputFields, setInputFields] = useState({
        username: "",
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    });
    const [errors, setErrors] = useState({});

    const usernameRegex = /^[\w.@+-]{5,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&_~`#^()+={}\\[\]:;"'<>,.?/\\|]{8,}$/;

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "username":
                if (!usernameRegex.test(value)) {
                    error = "Username must be at least 5 characters long and can include letters, numbers, and special characters.";
                }
                break;
            case "newPassword":
                if (!passwordRegex.test(value)) {
                    error = "New Password must be at least 8 characters long and include letters, numbers, and special characters.";
                }
                break;
            case "confirmNewPassword":
                if (value !== inputFields.newPassword) {
                    error = "Passwords do not match.";
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const validate = () => {
        let newErrors = {};

        Object.keys(inputFields).forEach((name) => {
            validateField(name, inputFields[name]);
        });

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value });
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        setLoading(true);
        await reset(inputFields);
        setLoading(false);
    };

    return (
        <div>
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
                                    name="username"
                                    placeholder="username"
                                    className="input input-bordered text-white focus:ring-2 focus:ring-rose-500"
                                    value={inputFields.username}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.username && <p className="text-red-500 text-xs py-1 w-60 text-left">{errors.username}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered text-white focus:ring-2 focus:ring-rose-500"
                                    value={inputFields.password}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.password && <p className="text-red-500 text-xs py-1 w-60 text-left">{errors.password}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">New Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"
                                    placeholder="New Password"
                                    className="input input-bordered text-white focus:ring-2 focus:ring-rose-500"
                                    value={inputFields.newPassword}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.newPassword && <p className="text-red-500 text-xs py-1 w-60 text-left">{errors.newPassword}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm New Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmNewPassword"
                                    placeholder="Confirm New Password"
                                    className="input input-bordered text-white focus:ring-2 focus:ring-rose-500"
                                    value={inputFields.confirmNewPassword}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.confirmNewPassword && <p className="text-red-500 text-xs py-1 w-60 text-left">{errors.confirmNewPassword}</p>}
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
                                    {loading ? <span className="loading loading-spinner"></span> : "Reset"}
                                </button>
                            </div>
                        </form>
                        <Link to="/login" className="my-2 flex justify-center">
                            <button
                                className="btn btn-accent w-[20rem]"
                                disabled={loading}
                            >
                                Back to Login
                            </button>                        
                        </Link>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reset;
