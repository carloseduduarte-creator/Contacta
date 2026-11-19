import styles from './SearchBar.module.scss';

const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Buscar por nombre (Trie)..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button type="button" onClick={onClear}>
          Limpiar
        </button>
      )}
    </div>
  );
};

export default SearchBar;
