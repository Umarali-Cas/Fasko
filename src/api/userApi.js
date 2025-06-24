export const addUserToDB = async (user) => {
  const res = await fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })

  if (!res.ok) {
    throw new Error('Ошибка при добавлении пользователя')
  }

  return res.json()
}
