
const sendSignUp = async (
    {
        fullname,
        username,
        password,
        confirmPassword,
        gender}
) => {
    try{
        const response = await fetch("/api/auth/signup",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                fullname,
                username,
                password,
                confirmPassword,
                gender})
        })
        const data = await response.json()
        return data
    }catch(error){
        return error
    }

}

export default sendSignUp
