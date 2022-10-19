import React, { createContext, useState } from 'react';

interface MenuContextInterface {
  textColor: string;
  setTextColor: React.Dispatch<React.SetStateAction<string>>;
}

type MenuProviderProps = {
  children: React.ReactNode;
}

const MenuContext = createContext<MenuContextInterface | null>(null);

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [textColor, setTextColor] = useState('rgb(23, 43, 77)');

  return (
    <MenuContext.Provider
      value={{
        textColor,
        setTextColor,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
