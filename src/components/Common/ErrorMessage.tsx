import React from 'react'

import * as colors from '../../constants/style'

export const errorMessageVariants = {
  stacked: { display: 'block' },
  inline: { display: 'inline-block' },
}

const ErrorMessage: React.FC<{
  error: Error
  variant: 'stacked' | 'inline'
  [props: string]: any
}> = ({ error, variant, ...props }) => {
  return (
    <div
      role="alert"
      css={[{ color: colors.danger }, errorMessageVariants[variant]]}
      {...props}
    >
      <span>There was an error: </span>
      <pre
        css={[
          { whiteSpace: 'break-spaces', margin: '0', marginBottom: -5 },
          errorMessageVariants[variant],
        ]}
      >
        {error.message}
      </pre>
    </div>
  )
}

export default ErrorMessage