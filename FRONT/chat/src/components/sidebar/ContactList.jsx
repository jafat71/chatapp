import { useEffect, useState } from "react";
import { useGetContacts } from "../../hooks/useGetContacts";
import useContact from "../../zustand/useContact";
import Contact from "./Contact"
const ContactList = () => {

    const {
        loading,
        getContactList
    } = useGetContacts();
    const {contacts,contactSearch} = useContact()
    const [displayContacts, setDisplayContacts] = useState([]);
    useEffect(() => {
        getContactList()
    }, [])

    useEffect(() => {
        const filteredContacts = contacts.filter(contact =>
            contact.fullname.toLowerCase().includes(contactSearch.toLowerCase())
        );
        setDisplayContacts( contactSearch==="" ? contacts : filteredContacts);
    }, [contactSearch, contacts]);

    return (
        <div className="flex flex-col items-center w-full h-full overflow-y-auto ">
            
            {
                displayContacts .map((contact)=>(
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