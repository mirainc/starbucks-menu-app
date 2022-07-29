import { formatPrice } from '../utils';
import styles from '../styles/menuItem.module.css';
import cn from 'classnames';

const MenuItem = ({ name, price, calories, inStock }) => {
  return (
    <div className={styles.root}>
      <div className={cn('title', inStock ? '' : 'out-of-stock')}>{name}</div>
      <div className="subtitle">
        LARGE | {formatPrice(price)} | {calories} CAL
      </div>
    </div>
  );
};

export default MenuItem;
