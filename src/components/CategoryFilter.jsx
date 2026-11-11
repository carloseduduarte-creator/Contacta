import { CATEGORIES } from '../helpers/helpers';
import styles from './CategoryFilter.module.scss';

const CategoryFilter = ({ selected, onSelect, counts }) => {
  return (
    <div className={styles.filters}>
      <button
        type="button"
        className={selected === 'Todos' ? styles.active : ''}
        onClick={() => onSelect('Todos')}
      >
        Todos
      </button>

      {CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          className={selected === category ? styles.active : ''}
          onClick={() => onSelect(category)}
        >
          {category}
          {counts && counts[category] !== undefined ? ` (${counts[category]})` : ''}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
