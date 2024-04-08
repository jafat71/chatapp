
const getMessages = async ({id}) => {
    try {
        const res = await fetch("/api/messages/"+id)
        const data = await res.json()
        return data
    } catch (error) {
        return error
    }
}

export default getMessages
