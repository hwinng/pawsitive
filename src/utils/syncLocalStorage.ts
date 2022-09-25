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
  if (!valueInLocalStorage || valueInLocalStorage === 'undefined') {
    return null
  }
  return JSON.parse(valueInLocalStorage)
}

export { syncLocalStorage }
