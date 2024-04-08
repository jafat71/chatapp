
import {create} from 'zustand'

const useContact = create((set)=>({
    selectedContact: null,
    setSelectedContact: (selectedContact) => set({selectedContact}),
    messages: [],
    setMessages: (messages) => set({messages}),
    contacts: [],
    setContacts: (contacts) => set({contacts}),
    contactSearch: "",
    setContactSearch: (contactSearch) => set({contactSearch}),
}))

export default useContact;