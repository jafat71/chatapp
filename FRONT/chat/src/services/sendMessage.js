
const sendMessage = async ({id,message}) => {
    try{
        const response = await fetch("/api/messages/send/"+id,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({message})
        })
        const data = await response.json()
        return data
    }catch(error){
        return error
    }

}

export default sendMessage
