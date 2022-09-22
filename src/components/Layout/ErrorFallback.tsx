import ErrorMessage from '../Common/ErrorMessage'

function ErrorFallback({ error }: { error: Error }) {
  return (
    <ErrorMessage
      error={error}
      variant="stacked"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  )
}

export { ErrorFallback }
