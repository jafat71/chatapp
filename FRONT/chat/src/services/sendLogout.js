
const sendLogout = async () => {
    try{
        const response = await fetch("/api/auth/logout",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
        })
        const data = await response.json()
        return data
    }catch(error){
        return error
    }

}

export default sendLogout
