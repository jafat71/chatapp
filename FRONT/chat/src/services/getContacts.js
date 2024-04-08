
export const getContacts = async () => {
    try {
        const res = await fetch("/api/users")
        const data = await res.json()
        return data
    } catch (error) {
        return error
    }
}
