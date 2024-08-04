
const sendReset = async (
    {
        username,
        password,
        newPassword,
        confirmNewPassword
    }
) => {
    console.log(JSON.stringify({
        username,
        password,
        newPassword,
        confirmNewPassword
    }))
    try {
        const response = await fetch("/api/auth/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                password,
                newPassword,
                confirmNewPassword
            })
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error
    }

}

export default sendReset
