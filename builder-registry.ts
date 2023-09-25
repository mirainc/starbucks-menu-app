import { Builder, withChildren } from '@builder.io/react';
import dynamic from 'next/dynamic';
import MenuLayout from './components/MenuLayout';
import StackedGroup from './components/StackedGroup';
import Items, { ItemsStyle } from './components/Items';
import MenuDataProvider from './components/MenuDataProvider';

Builder.registerComponent(
  dynamic(() => import('./components/MenuItem')),
  {
    name: 'MenuItem',
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'price', type: 'number' },
      { name: 'calories', type: 'number' },
      { name: 'inStock', type: 'boolean' },
    ],
  },
);

Builder.registerComponent(withChildren(MenuDataProvider), {
  name: 'MenuDataProvider',
  inputs: [
    { name: 'menu', type: 'string' },
    { name: 'apiKey', type: 'string' }
  ],
});

Builder.registerComponent(withChildren(MenuLayout), {
  name: 'MenuLayout',
  defaultChildren: [
    {
      '@type': '@builder.io/sdk:Element',
      component: { name: 'Text', options: { text: 'Column 1' } },
    },
    {
      '@type': '@builder.io/sdk:Element',
      component: { name: 'Text', options: { text: 'Column 2' } },
    },
  ],
});

Builder.registerComponent(withChildren(StackedGroup), {
  name: 'StackedGroup',
  inputs: [
    { name: 'heading', type: 'string' },
    { name: 'subheading', type: 'string' },
  ],
});

Builder.registerComponent(Items, {
  name: 'Items',
  inputs: [
    { name: 'groupTag', type: 'string' },
    { name: 'style', type: 'string', enum: [ItemsStyle.List, ItemsStyle.Photo], defaultValue: ItemsStyle.List},
    { name: 'min', type: 'number' },
    { name: 'max', type: 'number' }
  ],
});
