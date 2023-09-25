import React from 'react';
import styles from '../styles/Home.module.css';

interface Props {
  heading?: string;
  subheading?: string;
  children?: React.ReactNode;
}

const StackedGroup: React.FC<Props> = ({ heading, subheading, children }) => {
  return (
    <section className={styles.coldbrewMenuGroup}>
      <header>
        {heading && (
          <h1>{heading}</h1>
        )}
        {subheading && (
          <h2 className="h2 subheading">{subheading}</h2>
        )}
      </header>
      <div className={styles.coldbrewMenuItems}>
        {children}
      </div>
    </section>
  );
};

export default StackedGroup;