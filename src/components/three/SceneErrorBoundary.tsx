import { Component, type ReactNode } from 'react'

/** Si falla el chunk, el modelo o el contexto WebGL, no se renderiza nada y queda visible el fallback. */
export class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}
