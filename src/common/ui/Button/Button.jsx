import btnStyle from './Button.module.scss'

export function Button({ type, children, className = '', onClick }) {
  const style = `${btnStyle.btn} ${className}`

  return (
    <button
      className={style}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
