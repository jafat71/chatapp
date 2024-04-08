import { useEffect } from "react";
import { useGetContacts } from "../../hooks/useGetContacts";
import useContact from "../../zustand/useContact";
import Contact from "./Contact"

const ContactList = () => {

    const {
        loading,
        getContactList
    } = useGetContacts();

    useEffect(() => {
        getContactList()
    }, [])
    

    const {contacts} = useContact()
    
    return (
        <div className="flex flex-col items-center w-full h-[250px] md:flex overflow-y-auto md:h-screen ">
            
            {
                contacts.map((contact)=>(
                    <Contact
                        key={contact._id}
                        conversation={contact}
                    />
                ))
            }
            
            {
                loading 
                ? <span className="loading loading-spinner mx-auto"></span>
                : null
            }

        </div>
    )
}

export default ContactList