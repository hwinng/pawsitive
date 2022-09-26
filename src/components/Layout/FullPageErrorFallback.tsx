import styled from 'styled-components'

import * as colors from 'constants/colors'

const FullPageErrorFallbackWrapper = styled.div`
  color: ${colors.danger};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
function FullPageErrorFallback(error: { error: Error }) {
  return (
    <FullPageErrorFallbackWrapper role="alert">
      <p>There's a problem. Try refreshing the app.</p>
      <pre>{error.error.message}</pre>
    </FullPageErrorFallbackWrapper>
  )
}

export { FullPageErrorFallback }
