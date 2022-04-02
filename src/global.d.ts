/// <reference types="svelte" />

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onoutsideClick?: () => void
  }
}
