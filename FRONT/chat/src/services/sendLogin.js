
const sendLogin = async (
    {
        username,
        password
    }
) => {
    try{
        const response = await fetch("/api/auth/login",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                username,
                password
                })
        })
        const data = await response.json()
        return data
    }catch(error){
        return error
    }

}

export default sendLogin
