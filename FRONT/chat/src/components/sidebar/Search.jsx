import { useEffect, useState } from "react"
import useContact from "../../zustand/useContact"
const Search = () => {
    
    const [search, setSearch] = useState("")

    const {setContactSearch} = useContact()

    useEffect(() => {
        if(search.length>0){
            setContactSearch(search)
        }else{
            setContactSearch("")
        }
    }, [search])
    
    return (
        <div>
            <form className="flex flex-col items-center px-2">
                <span className="label-text mb-1 text-rose-300 font-bold">INSTACHAT</span>
                <label className="flex items-center gap-2">
                    <input 
                    type="text" 
                    placeholder="Look a friend" 
                    className="w-full bg-gray-200 rounded-md outline-none p-1 text-black focus:ring-2 focus:ring-rose-500" 
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)} 
                    required />
                    <button disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 hover:scale-150 hover:text-rose-400 transition-all duration-150"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </button>
                </label>

            </form>
        </div>
    )
}

export default Search