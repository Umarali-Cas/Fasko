import styles from './FilterButtons.module.scss'

export const FilterButtons = ({ setColumns }) => {
  return (
    <div className={styles.filters}>
      {[2, 3, 4].map((num) => (
        <button
          key={num}
          onClick={() => setColumns(num)}
        >
          {num}
        </button>
      ))}
    </div>
  )
}
