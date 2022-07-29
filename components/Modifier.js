import { formatPrice, getTag } from '../utils';
import cn from 'classnames';

import styles from '../styles/modifier.module.css';

const Modifier = (item) => {
  const { name, price } = item;
  const calories = item.calories || getTag(item.tags, 'calories');

  return (
    <div>
      <div className={cn(styles.root, 'h2')}>{name}</div>
      <div className={styles.description}>
        Blonde or Signature
        <div className={styles.details}>
          ${formatPrice(price)} {calories ? `| ${calories} Cal` : ''}
        </div>
      </div>
    </div>
  );
};

export default Modifier;
