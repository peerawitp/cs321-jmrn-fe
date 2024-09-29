'use client'
import {createContext, ReactNode, useState} from 'react'

interface IdContext {
    id : string | null;
    setID : (id : string) => void
}

export const Context = createContext<IdContext>({
    id : null,
    setID: () =>{}
})

const TableContext = ({children}:{children: ReactNode}) => {
    const [id, setID] = useState<string|null>(null);

    
  return (
    <Context.Provider value={{id, setID}}>
        {children}
    </Context.Provider>
  )
}

export default TableContext