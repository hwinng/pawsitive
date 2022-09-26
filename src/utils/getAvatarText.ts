const getAvatarLetter = (str: string | undefined) => {
  if (!str) {
    return 'AV'
  }
  return str.slice(0, 2).toString().toUpperCase()
}

export { getAvatarLetter }
