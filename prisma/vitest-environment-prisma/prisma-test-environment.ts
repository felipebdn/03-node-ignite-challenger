import type { Environment } from 'vitest'

export default <Environment>{
  name: 'custom',
  transformMode: 'web',
  async setup() {
    console.log('Setup')

    return {
      async teardown() {
        console.log('Teardown')
      },
    }
  },
}
