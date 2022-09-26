import styled from 'styled-components'

import Spinner from 'components/Common/Spinner'

const FullPageSpinnerWrapper = styled.div`
  font-size: 4em;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const SeedingText = styled.h3``
const FullPageSpinner: React.FC<{ seeding?: boolean }> = ({ seeding }) => {
  return (
    <FullPageSpinnerWrapper>
      <Spinner />
      {seeding && <SeedingText>Waiting for creating sample data</SeedingText>}
    </FullPageSpinnerWrapper>
  )
}

export { FullPageSpinner }
