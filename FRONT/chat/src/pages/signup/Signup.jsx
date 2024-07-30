import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
    const [signup] = useSignup();
    const [loading, setLoading] = useState(false);
    const [inputFields, setInputFields] = useState({
        fullname: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: ""
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const fullnameRegex = /^[a-zA-Z\s]{8,}$/;
    const usernameRegex = /^[\w.@+-]{5,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&_~`#^()+={}\\[\]:;"'<>,.?/\\|]{8,}$/;

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "fullname":
                if (!fullnameRegex.test(value)) {
                    error = "Full name must be at least 8 characters long and contain only letters and spaces.";
                }
                break;
            case "username":
                if (!usernameRegex.test(value)) {
                    error = "Username must be at least 5 characters long and can include letters, numbers, and special characters.";
                }
                break;
            case "password":
                if (!passwordRegex.test(value)) {
                    error = "Password must be at least 8 characters long and include letters, numbers, and special characters.";
                }
                break;
            case "confirmPassword":
                if (value !== inputFields.password) {
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
        await signup(inputFields);
        setLoading(false);
    };

    const handleGenderChange = (e) => {
        setInputFields({ ...inputFields, gender: e.target.value });
    };

    return (
        <div>
            <div className="hero text-black">
                <div className="hero-content min-h-screen  flex-col lg:flex-row lg:gap-40">
                    <div className="flex flex-col items-center justify-center lg:text-left">
                        <div className="flex flex-col items-center lg:flex-row transition-all duration-500">
                            <img src="./random-logo.svg" className="w-[150px]" alt="Logo" />
                            <h1 className="text-5xl font-bold border-black">INSTACHAT</h1>
                        </div>
                    </div>

                    <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullname"
                                    placeholder="Jhon Doe"
                                    className="input input-bordered text-white focus:ring-2 focus:ring-rose-500"
                                    value={inputFields.fullname}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.fullname && 
                                <p className="text-red-500 text-xs py-1 w-60 text-left">{errors.fullname}</p>}
                            </div>
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
                                    placeholder="Password"
                                    className="input input-bordered text-white focus:ring-2 focus:ring-rose-500"
                                    value={inputFields.password}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.password && <p className="text-red-500 text-xs py-1 w-60 text-left">{errors.password}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Password"
                                    className="input input-bordered text-white focus:ring-2 focus:ring-rose-500"
                                    value={inputFields.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-xs py-1 w-60 text-left">{errors.confirmPassword}</p>}
                            </div>
                            <div className="form-control">
                                <label className="cursor-pointer label">
                                    <span className="label-text">Show Passwords</span> 
                                    <input 
                                        type="checkbox" 
                                        className="checkbox checkbox-primary" 
                                        checked={showPassword}
                                        onChange={() => setShowPassword(!showPassword)} 
                                    />
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Gender</span>
                                </label>
                                <div className="join mx-auto">
                                    <input
                                        className="join-item btn px-6"
                                        type="radio"
                                        name="gender"
                                        value="MALE"
                                        checked={inputFields.gender === "MALE"}
                                        onChange={handleGenderChange}
                                        aria-label="Male"
                                    />
                                    <input
                                        className="join-item btn"
                                        type="radio"
                                        name="gender"
                                        value="FEMALE"
                                        checked={inputFields.gender === "FEMALE"}
                                        onChange={handleGenderChange}
                                        aria-label="Female"
                                    />
                                </div>
                                <label className="label">
                                    <Link to="/login" className="label-text-alt link link-hover mt-2">Already have an account?</Link>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? <span className="loading loading-spinner"></span> : "Sign up"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
