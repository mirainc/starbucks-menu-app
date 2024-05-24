import { formatPrice, getTag } from '../utils';
import cn from 'classnames';
import Image from 'next/image';
import styles from '../styles/coldbrewMenuItem.module.css';

const ColdbrewMenuItems = ({ name, price, calories, inStock, tags }) => {
  const itemId = getTag(tags, 'id');

  const tagImageMap = {
    regular: '/cold-brew.webp',
    'salted-caramel': '/cold-brew-salted-caramel.webp',
    milk: '/cold-brew-milk.webp',
  };

  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        <img src={tagImageMap[itemId]} alt="" width={220} height={220} />
      </div>
      <div className={styles.text}>
        <div className={cn('title', inStock ? '' : ' out-of-stock')}>
          {name}
        </div>
        <div className="subtitle">
          {formatPrice(price)} | {calories} CAL
        </div>
      </div>
    </div>
  );
};

export default ColdbrewMenuItems;
