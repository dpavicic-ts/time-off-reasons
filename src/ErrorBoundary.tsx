import React, { ErrorInfo } from 'react'
import { reportError } from './api'

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  { hasError: boolean }
> {
  state = { hasError: false }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ hasError: true })
    reportError(error, info)
  }

  tryAgain = () => this.setState({ hasError: false })

  render() {
    return this.state.hasError ? (
      <div>
        <div role="alert">There was a problem.</div>
        <button onClick={this.tryAgain}>Try again?</button>
      </div>
    ) : (
      this.props.children
    )
  }
}
