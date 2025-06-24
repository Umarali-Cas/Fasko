/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'

import arrowIcon from '../../../assets/icons/arrowIcon.svg'

import styles from './CustomDropdown.module.scss'

export const CustomDropdown = ({
  options,
  selectedOption,
  onSelect,
  label,
  marginBottom,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (option) => {
    onSelect(option)
  }

  return (
    <div
      className={styles.dropdownContainer}
      style={
        isOpen === false
          ? { margin: '0' }
          : { marginBottom: marginBottom || '0' }
      }
    >
      <div className={styles.dropdownHeader}>
        <button
          className={styles.dropdownButton}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={styles.dropdownSpan}>{selectedOption || label}</span>
        </button>
        <img
          src={arrowIcon}
          alt="arrowIcon"
          className={isOpen ? styles.arrowIcon : styles.arrowIconRotate}
        />
      </div>
      {isOpen && (
        <div
          className={
            label === 'Collections'
              ? styles.dropdownCollections
              : label === 'Brands'
                ? styles.dropdownMenu
                : styles.dropdownContainer
          }
        >
          {options.map((option) => (
            <div
              key={option}
              className={`${styles.dropdownItem} ${
                selectedOption === option ? styles.activeItem : ''
              }`}
              onClick={() => handleClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
