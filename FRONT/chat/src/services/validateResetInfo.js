import toast from "react-hot-toast"

const validateResetInfo = ({
    username,
    password,
    newPassword,
    confirmNewPassword}) => {

    if(!username || !password || !newPassword || !confirmNewPassword){
        toast.error("Please fill all fields")
        return false
    }
    if(newPassword !== confirmNewPassword) {
        toast.error("Passwords do not match")
        return false
    }

    if(newPassword.length < 8){
        toast.error("Passwords must be higher than 8 characters")
        return false

    }

  return true
}

export default validateResetInfo
