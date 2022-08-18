import React, { createContext, useState } from 'react'

const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
  const [textColor, setTextColor] = useState('rgb(23, 43, 77)')
    
  return (
    <MenuContext.Provider
      value={{
        textColor,
        setTextColor
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export default MenuContext