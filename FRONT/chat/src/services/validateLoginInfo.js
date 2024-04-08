import toast from "react-hot-toast"

const validateLoginInfo = ({username,password}) => {

    if(!username || !password){
        toast.error("Please fill all fields")
        return false
    }

    return true
}

export default validateLoginInfo
