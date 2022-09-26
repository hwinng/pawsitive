import styled from 'styled-components'

import Spinner from 'components/Common/Spinner'

const SeedingText = styled.h3``
const FullPageSpinner: React.FC<{ seeding?: boolean }> = ({ seeding }) => {
  return (
    <div
      style={{
        fontSize: '4em',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
      {seeding && <SeedingText>Waiting for creating sample data</SeedingText>}
    </div>
  )
}

export { FullPageSpinner }
