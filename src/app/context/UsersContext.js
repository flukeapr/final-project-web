
'use client'
import { useState, createContext,useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { GetUserQuiz, GetUserScore } from "../components/action/UserAction";

const UserContext = createContext();

export function UserProvider({ children }) {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);
    const [allQuiz , setAllQuiz] = useState([])

    const fetchUsers = async () => {
        
        try {
            const result = await GetUserScore()
           
            setUsers(result.data);
        } catch (error) {
            console.log(error)
        }
        

    }
    const fetchUserQuiz = async () => {
       
        try {
            const result = await GetUserQuiz()
            
            setAllQuiz(result.data)
        } catch (error) {
            console.log(error)
        }

    }
    
    

    return (

        <UserContext.Provider value={{ users, setUsers, fetchUsers,fetchUserQuiz ,allQuiz }}>
            {children}
        </UserContext.Provider>
    )

}

export const useUserContext = () => useContext(UserContext)