export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Ошибка при сохранении в localStorage', error)
  }
}

export const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Ошибка при загрузке из localStorage', error)
    return null
  }
}

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Ошибка при удалении из localStorage', error)
  }
}
