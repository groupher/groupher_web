import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import { createServerEntry } from '@tanstack/react-start/server-entry'

// TanStack Start server entry used by the production Node runtime.
const fetch = createStartHandler(defaultStreamHandler)

export default createServerEntry({ fetch })
