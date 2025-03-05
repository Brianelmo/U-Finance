import {createContext, useState, ReactNode} from 'react'; 

interface User{
    id:number,
    nombre:string
}

interface UserContextProps{
    user:User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>; 
}

export const userContext = createContext<UserContextProps | undefined>(undefined); 

export const UserProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null); 

    return(
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}