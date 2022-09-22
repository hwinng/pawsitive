function syncLocalStorage(
  key: string,
  option: {
    method: 'serialize' | 'deserialize'
    data?: any
  } = { method: 'deserialize' }
) {
  if (option.method === 'serialize') {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key)
    }
    localStorage.setItem(key, JSON.stringify(option.data))
    return null
  }

  const valueInLocalStorage = localStorage.getItem(key)
  if (valueInLocalStorage) {
    return JSON.parse(valueInLocalStorage)
  }
  return null
}

export { syncLocalStorage }