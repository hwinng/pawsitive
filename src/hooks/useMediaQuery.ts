import { useEffect, useState } from 'react'

import type { MediaQueryString } from 'types/types'

function useMediaQuery(query: MediaQueryString): boolean {
  const getMatches = (query: MediaQueryString): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  }

  const [matches, setMatches] = useState<boolean>(getMatches(query))

  function handleChange() {
    setMatches(getMatches(query))
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query)
    // Triggered at the first client-side load and if query changes
    handleChange()
    // Listen matchMedia
    matchMedia.addEventListener('change', handleChange)

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}

export { useMediaQuery }
