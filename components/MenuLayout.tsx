import React from 'react';
import styles from '../styles/Home.module.css';

interface Props {
  children?: React.ReactNode;
}

const MenuLayout: React.FC<Props> = ({ children }) => {
  return <main className={styles.mainLayout}>{children}</main>;
}

export default MenuLayout;