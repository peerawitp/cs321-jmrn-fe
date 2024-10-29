'use client'
import {createContext, ReactNode, useState} from 'react'

interface IdContext {
    id : number | null;
    setID : (id : number) => void
}

export const Context = createContext<IdContext>({
    id : null,
    setID: () =>{}
})

const TableContext = ({children}:{children: ReactNode}) => {
    const [id, setID] = useState<number|null>(null);

    
  return (
    <Context.Provider value={{id, setID}}>
        {children}
    </Context.Provider>
  )
}

export default TableContext