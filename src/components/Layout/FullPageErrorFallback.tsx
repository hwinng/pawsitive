import * as colors from '../../constants/style'

function FullPageErrorFallback(error: { error: Error }) {
  return (
    <div
      role="alert"
      style={{
        color: colors.danger,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>There's a problem. Try refreshing the app.</p>
      <pre>{error.error.message}</pre>
    </div>
  )
}

export { FullPageErrorFallback }
