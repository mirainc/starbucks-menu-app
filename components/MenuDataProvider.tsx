import React, { useEffect, useState } from 'react';
import { MenuData } from '../types';

export const MenuDataContext = React.createContext<MenuData | undefined>(undefined);

interface MenuDataProviderProps {
  menu: string;
  apiKey: string;
  children?: React.ReactNode;
}

const MenuDataProvider: React.FC<MenuDataProviderProps> = (props) => {
  const [error, setError] = useState<boolean>(false);
  const [menuData, setMenuData] = useState<MenuData | undefined>();

  useEffect(() => {
    console.log('menu changed');
    const fetchData = async () => {
      console.log('fetching menu');
      const menuApi = 'https://menu-api.raydiant.com/v1/groups';

      if (!props.menu || !props.apiKey) {
        console.error('[MenuDataProvider] Missing menu or api key');
        return setError(true);
      }

      // Make request to the On-Brand Menu API.
      const res = await fetch(`${menuApi}?menus=${props.menu}&depth=5`, {
        headers: { 'X-API-Key': props.apiKey },
      });

      // Forward the response status code from the On-Brand Menu API.
      if (!res.ok) {
        console.error('[MenuDataProvider] Failed to fetch menu');
        return setError(true);
      }

      setError(false);
      setMenuData(await res.json());
    };

    fetchData();
  }, [props.menu, props.apiKey]);

  if (!menuData) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error loading menu</h1>;
  }

  return (
    <MenuDataContext.Provider value={menuData}>
      {props.children}
    </MenuDataContext.Provider>
  );
};

export default MenuDataProvider;