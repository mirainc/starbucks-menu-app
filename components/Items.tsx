import React, { useContext } from 'react';
import { MenuDataContext } from './MenuDataProvider';
import { getRecord } from '../utils';
import ColdbrewMenuItems from './ColdbrewMenuItem';
import MenuItem from './MenuItem';

export enum ItemsStyle {
  List = 'list',
  Photo = 'photo',
}

interface Props {
  groupTag: string;
  style: ItemsStyle;
  min?: number;
  max?: number;
}

const Items: React.FC<Props> = ({ groupTag, style, min, max }) => {
  const menuData = useContext(MenuDataContext);

  if (!menuData) {
    return <h1>No Menu Data</h1>;
  }

  const group = getRecord(menuData.groups, groupTag);
  if (!group) {
    return <h1>Group Not Found</h1>;
  }
  
  let items = group.items;
  if (min !== undefined && max !== undefined) {
    items = items.slice(min, max);
  }

  if (style === ItemsStyle.Photo) {
    return (
      <>
        {items.map((i) => (
          <ColdbrewMenuItems key={i.id} {...i} />
        ))}
      </>
    );
  } else {
    return (
      <>
        {items.map((i) => (
          <MenuItem key={i.id} {...i} />
        ))}
      </>
    );
  }
}

export default Items;