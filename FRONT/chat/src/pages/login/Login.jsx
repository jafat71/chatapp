
const Login = () => {
    return (
        <div>
            <div className="hero min-h-screen text-black">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="flex flex-col items-center justify-center lg:text-left">
                        <div className="flex flex-col items-center lg:flex-row transition-all duration-500">
                            <img src="./random-logo.svg" className="w-[150px]"></img>
                            <h1 className="text-5xl font-bold border-black">INSTACHAT</h1>
                        </div>
                        <p className="py-6 text-xl lg:text-center lg:py-0">
                            ¡Sumérgete en una experiencia de comunicación sin límites!
                        </p>
                    </div>


                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input type="text" placeholder="username" className="input input-bordered text-white focus:ring-2 focus:ring-rose-500" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered text-white focus:ring-2 focus:ring-rose-500" required />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>

                            <div className="form-control mt-1">
                                <button className="btn btn-secondary">Signup</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
